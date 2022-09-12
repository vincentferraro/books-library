const { success, fail } = require('./helper')

const express = require('express')
var bodyParser = require('body-parser')

const morgan = require('morgan')
const bcrypt = require('bcrypt')

let sequelize = require('./src/db/sequelize')
const Book = require('./src/db/sequelize').Book
const User = require('./src/db/sequelize').User

const cors = require('cors')

const port = process.env.PORT||3000 
const app = express()

//SEQUELIZE

sequelize.Connect()


// MIDDLEWARES

app.use(bodyParser.json())
    .use(cors())
    
// MODULES

require('./src/routes/showBook')(app, Book)
require('./src/routes/showBookById')(app, Book, success, fail)
require('./src/routes/createBook')(app, Book)
require('./src/routes/deleteBook')(app, Book, success)
require('./src/routes/updateBook')(app,Book,success, fail)
require('./src/routes/login')(app,User,success,fail,bcrypt)

//HEROKU

app.get('/', (req, res) => {
    res.json('Hello Heroku!!')
})

//ERROR
app.use((req,res,next)=>{
    res.status(404).send('Page introuvable!!!!')
})


// LISTEN

app.listen(port,()=>{
    console.log(`Serveur ON sur: http://127.0.0.1:3000`)
})


