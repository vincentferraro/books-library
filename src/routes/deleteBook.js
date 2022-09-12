const auth = require('../auth/auth')

module.exports = (app, Book, success) => {
    
app.delete('/api/books/:id',auth,(req,res)=>{
    let id = parseInt(req.params.id)
    let bookDeleted = async ()=>{
        return await Book.destroy({
            where : {
                id : id
            }
        })
    }
    bookDeleted()
    res.status(200).json(success(`Livre supprimé`))
})

}