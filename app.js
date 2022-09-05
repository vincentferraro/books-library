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
            console.log(value)
            res.json(value)
        })
})

//POST

app.post('/api/books',(req,res)=>{
    let id= books.length+1
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
    let id=parseInt(req.params.id)
    console.log(id)
    if(id<books.length){
        const bookUpdated=books.find((book)=>{
            if(book.id===id){
                book.author=req.body.author
                book.title=req.body.title
                book.year=req.body.year
                book.pages=req.body.pages
                book.genres=req.body.genres
                return book
            }
        })

        const message= `Livre n°${bookUpdated.id} mis à jour`
        res.status(200).json(success(message,bookUpdated))
        
    }else{
        const message="Livre introuvable"
        res.status(404).json(fail(message))
    }
    
})


app.use((req,res,next)=>{
    res.status(404).send('Page introuvable!!!!')
})

app.listen(port,()=>{
    console.log(`Serveur ON sur: http://127.0.0.1:3000`)
})


