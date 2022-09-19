const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const fail = require('../../helper').fail
const User = require('../db/sequelize').User

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        console.log('appel post')
        console.log(req.body.username)
        User.findOne({raw:true, where: {username: req.body.username}})
                    .then(result => {
                            console.log(result)
                                    bcrypt.compare(req.body.password, result.dataValues.password)
                                        .then(resultat => {
                                            console.log('appel 2')
                                            if (resultat) {
                                                console.log(resultat)
                                                const token = jwt.sign({user: result.dataValues.username},'CUSTOM_PRIVATE_KEY',{expiresIn:'1d'})
                                                const message = 'succès'
                                                res.status(200).json({ message, result, token })
                                            } else {
                                                res.status(401).json(fail(`Identifiant ou mot de passe invalide`))
                                            }
                                            
                                        })
                                        
                
                        })
                    .catch(rej => res.status(401).json(fail("Identifiant invalide",rej)))
    })
}