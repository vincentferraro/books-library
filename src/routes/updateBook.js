const auth = require('../auth/auth')

module.exports = (app, Book, success, fail) => {
    app.put('/api/books/:id',auth, (req,res)=>{

    
    let id= parseInt(req.params.id)
    let bookToUpdate = req.body

    //function 

    const bookUpdated = async()=>{
        await Book.update({
            author : bookToUpdate.author,
            title : bookToUpdate.title,
            year : bookToUpdate.year,
            pages : bookToUpdate.pages,
            genres : bookToUpdate.genres
        },{
            returning : true,
            plain : true,
            where :{
                id : id
            } 
        })
    }

    const books = async()=> await Book.findOne({
        raw : true ,
        where : {
            id : id
        }
        })

    books().then( resolve =>{
        if(resolve == null){
            res.json(fail("Livre non trouvé"))
            
        }else{
            
            bookUpdated().then(()=>{
                res.json(success(`Livre n° ${id} modifié avec succès`))
            })  
        }
    })
})
}