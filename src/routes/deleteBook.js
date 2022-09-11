module.exports = (app, Book, success) => {
    
app.delete('/api/books/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let bookDeleted = async ()=>{
        return await Book.destroy({
            where : {
                id : id
            }
        })
    }
    bookDeleted()
    res.json(success(`Livre supprimé`))
})

}