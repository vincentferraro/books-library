const { Sequelize, DataTypes } = require('sequelize')
const  bookModel = require('../models/BookModel')
const userModel = require('../models/User')

const books = require('../../mock-books.json')


 let sequelize = new Sequelize(
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
        
    

 const Connect = ()=>{
    try{
        sequelize.authenticate()
        console.log("Connection OK")
    } catch (error){
        console.log("NOT OK Connection")
    }
}

const Book=bookModel(sequelize, DataTypes)

const InitDb = ()=>{
    Book.sync({ force : true}).then(()=>{
        
        books.map((book)=>{
            Book.create({
                "author" : book.author,
                "title" : book.title,
                "year" : book.year,
                "pages" : book.pages,
                "genres" : book.genres
            })
        })   
    })
    console.log("BDD initialisée")
}

// USER SEQUELIZE

const User = userModel(sequelize,DataTypes)

const initDbUser = () => {
    User.sync({ force: true }).then(e => console.log(`Table User crée avec succès`,e))
                                .catch( err => console.log(`Erreur lors de la création de la table`,err))
    
}
module.exports = {
    Connect, InitDb, Book, initDbUser, User
}
