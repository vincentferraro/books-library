module.exports = (app, Book) => {
    app.post('/api/books/',(req,res)=>{
    
    let book={...req.body}
    let bookCreated = async()=>{
        return await Book.create({
            author : book.author,
            title : book.title,
            year : book.year,
            pages : book.pages,
            genres : book.genres
        },
        {   
            
            returning : true
        })
    }

    
    bookCreated().then( value =>
                { console.log(value)
                    res.json(value)
                })
                .catch( err => {console.log(err)
                                res.json(err)})
})

}