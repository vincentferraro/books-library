const { success, fail } = require('./helper')

const express = require('express')
var bodyParser = require('body-parser')

const morgan = require('morgan')


let sequelize = require('./src/db/sequelize')
const Book = require('./src/db/sequelize').Book
const User = require('./src/db/sequelize').User

const port = 3000 
const app = express()

//Sequelize

sequelize.Connect()
//sequelize.initDbUser()

// MIDDLEWARES

app.use(morgan("tiny")).use((req,res,next)=>{
        console.log("Time:", new Date().toLocaleDateString())
        next()
        })
    .use(bodyParser.json())
    
// MODULES

require('./routes/showBook')(app, Book)
require('./routes/showBookById')(app, Book, success, fail)
require('./routes/createBook')(app, Book)
require('./routes/deleteBook')(app, Book, success)
require('./routes/updateBook')(app,Book,success, fail)

//ERROR
app.use((req,res,next)=>{
    res.status(404).send('Page introuvable!!!!')
})

// LISTEN

app.listen(port,()=>{
    console.log(`Serveur ON sur: http://127.0.0.1:3000`)
})


