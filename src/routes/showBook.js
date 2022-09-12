const auth = require('../auth/auth')
const { Op } = require('sequelize')
const success = require('../../helper').success


module.exports = (app, Book) => {
    app.get('/api/books', auth, (req, res) => {  
        if (req.query.title) {
            Book.findAll({
                where: {
                    title:
                        {[Op.like]: `%${req.query.title}%`}
                },
                limit: 3,
                raw: true
            })
            .then(resolve => {
                    if (resolve == '') {
                        res.status(404).json('Aucun livre trouvé')
                    } else {
                        res.status(200).json(success('Livre(s) trouvé(s)',resolve))
                    }
                })
            }
        if (req.query.author) {
            console.log(req.query.author)
            Book.findAll({
                    where: {author: {[Op.like] : `%${req.query.author}%`}},
                    limit: 3,
                    raw: true
                    })
                    .then(
                        resolve => {
                            if (resolve=='') {
                                res.status(404).json('Aucun Livre trouvé')
                            }
                            else {
                                res.status(200).json(success('Livre(s) trouvé(s)', resolve))
                            }
                    })
            
        }
        if (!req.query.title && !req.query.author) {
            Book.findAll()
                .then(value => {
                        res.status(200).json(value)})
        }
 })
}