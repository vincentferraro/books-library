const auth = require('../auth/auth')
module.exports = (app, Book) => {
    app.get('/api/books',auth,(req,res)=>{      
        const books = async()=> await Book.findAll()
         books().then(value => {
             res.json(value)
         })
 })
}