const { Sequelize, DataTypes } = require('sequelize')
const bookModel = require('../models/BookModel')
const books = require('../../mock-books.json')
const sequelize = new Sequelize(
    'books_library',
    'username',
    ' ',
    {
        host : '192.168.64.2',
        dialect : 'mariadb',
        dialectOptions : {
            timezone : 'Etc/GMT-2'
        },
        logging : false
    },
    
)

async function Connect(){
    try{
        await sequelize.authenticate()
        console.log("Connection OK")
    } catch (error){
        console.error("NO OK",error)
    }
}

Connect()

const Book = bookModel(sequelize, DataTypes)
Book.sync({force : true}). then(()=>{
        console.log(`BDD "Books" synchronisée`)
        books.map((book)=>{
            Book.create({
                "author" :  book.author,
                "title" : book.title,
                "year" : book.year,
                "pages" : book.pages,
                "genres" : book.genres.join()
            })
        })
        console.log("Tables ajoutées")
        })

