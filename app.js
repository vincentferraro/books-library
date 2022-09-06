const { success, fail } = require('./helper')

const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')


let sequelize = require('./src/db/sequelize')
const Book = require('./src/db/sequelize').Book

const port = 3000 
const app = express()


sequelize.Connect()

// MIDDLEWARES

app.use(morgan("tiny"))
    .use((req,res,next)=>{
        console.log("Time:", new Date().toLocaleDateString())
        next()
    })
    .use(bodyParser.json())
    

//GET METHODS

app.get('/api/books',(req,res)=>{      
       const books = async()=> await Book.findAll()
        books().then(value => {
            res.json(value)
        })
})

app.get('/api/books/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    const books = async()=> await Book.findOne({
        raw : true,
        where : {
            id : id
        }  })
        console.log(books())
        books().then(value => {
                            if(value){
                                console.log(value)
                                res.json(success("Livre trouvé", value))
                            }else{
                                console.log(value)
                                res.json(fail("Livre introuvable"))
                            }
                            })         
})
//POST

app.post('/api/books/',(req,res)=>{
    
    let bookCreated={...req.body,...{id : id}}
    books.push(bookCreated)
    const message = `Livre ${bookCreated.title} crée`
    /*fs.writeFile(booksdata, JSON.stringify(bookCreated),(err)=>{
        if (err) throw err
        console.log(books.length)
    })*/
    res.json(success(message,bookCreated))
})

//PUT

app.delete('/api/books/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    if(id>books.length){
        
        res.status(404).json(fail("ID introuvable"))
    }
    else{
        let newBooksArray= books.filter((book)=> book.id!==id)
        books=newBooksArray
        const message = `Livre supprimé`
        
        res.status(200).json(success(message,message))
    }
})

//PUT

app.put('/api/books/:id', (req,res)=>{

    
    let id= parseInt(req.params.id)
    let bookToUpdate = req.body

    //function 

    const bookUpdated = async()=>{
        await Book.update({
            author : bookToUpdate.author,
            title : bookToUpdate.title,
            year : bookToUpdate.year,
            pages : bookToUpdate.pages,
            genres : bookToUpdate.genres
        },{
            returning : true,
            plain : true,
            where :{
                id : id
            } 
        })
    }

    const books = async()=> await Book.findOne({
        raw : true ,
        where : {
            id : id
        }
        })

    books().then( resolve =>{
        if(resolve == null){
            res.json(fail("Livre non trouvé"))
            
        }else{
            
            bookUpdated().then(()=>{
                res.json(success(`Livre n° ${id} modifié avec succès`))
            })  
        }
    })
})


app.use((req,res,next)=>{
    res.status(404).send('Page introuvable!!!!')
})

app.listen(port,()=>{
    console.log(`Serveur ON sur: http://127.0.0.1:3000`)
})


