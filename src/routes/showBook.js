module.exports = (app, Book)=>{
    app.get('/api/books',(req,res)=>{      
        const books = async()=> await Book.findAll()
         books().then(value => {
             res.json(value)
         })
 })
}