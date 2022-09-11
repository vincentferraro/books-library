const auth = require('../auth/auth')

module.exports = (app, Book, success, fail) => {

app.get('/api/books/:id',auth,(req,res)=>{
    let id = parseInt(req.params.id)
    const books = async()=> {
        return await Book.findOne({
            raw : true,
            where : {
                id : id
            }  })
        } 
    console.log(books())
    books().then(value => { 
                        if(value){
                            console.log(value)
                            res.json(success("Livre trouvé", value))
                        }else{
                            console.log(value)
                            res.json(fail("Livre introuvable"))
                        }
                        })
           
})
}