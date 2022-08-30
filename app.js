
const express = require('express')
var bodyParser = require('body-parser')

const port = 3000 

const app = express()

let books= require('./mock-books.json')

const logger = (req,res,next)=>{
    console.log(`URL:${req.url}`)
    next()
}

app.use(logger)
app.use(bodyParser.json())
    

//GET METHODS

app.get('/',(req,res)=>{
    res.send('Server On!')
})

app.get('/books',(req,res)=>{
    res.json(books)
    })

app.get('/books/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    const book=books.find(book => book.id === id)
    res.json(book)
})

//POST METHODS

app.post('/books',(req,res)=>{
        res.json(req.body)
})


app.use((req,res,next)=>{
    res.status(404).send('Page introuvable!!!!')
})

app.listen(port,()=>{
    console.log(`Serveur ON sur: http://127.0.0.1:3000`)
})