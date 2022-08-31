const { success, fail } = require('./helper')
const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
//const booksdata=fs.readFileSync('./mock-books.json')
const port = 3000 

const app = express()

let books= require('./mock-books.json')


app
    .use(morgan("tiny"))
    .use((req,res,next)=>{
        console.log("Time:", new Date().toLocaleDateString())
        next()
    })
    .use(bodyParser.json())
    

//GET METHODS

app.get('/api',(req,res)=>{
    res.send('Server On!')
})

app.get('/api/books',(req,res)=>{
    const message="Voici la liste des livres"
    res.json(success(message,books))
   } )

app.get('/api/books/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const book=books.find(book => book.id === id)
    if(book){
        const message = `Ci dessous le livre n°${id}`
    res.send(success(message,book))
    }else{
        res.json(fail("Le numéro de livre est inexistant"))
    }
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
        res.json(fail("ID introuvable"))
    }
    else{
        let newBooksArray= books.filter((book)=> book.id!==id)
        books=newBooksArray
        const message = `Livre supprimé`
        res.json(success(message,message))
    }
})


app.use((req,res,next)=>{
    res.status(404).send('Page introuvable!!!!')
})

app.listen(port,()=>{
    console.log(`Serveur ON sur: http://127.0.0.1:3000`)
})