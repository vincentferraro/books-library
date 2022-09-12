const auth = require('../auth/auth')

module.exports = (app, Book) => {
    app.post('/api/books/',auth,(req,res)=>{
    
    let book={...req.body}
    let bookCreated = async()=>{
        return await Book.create({
            author : book.author,
            title : book.title,
            year : book.year,
            cover : book.cover,
            genres : book.genres
        },
        {   
            
            returning : true
        })
    }

    
    bookCreated().then( value =>
                { console.log(value)
                    res.status(200).json(value)
                })
                .catch( err => {console.log(err)
                                res.status(400).json(err)})
})

}