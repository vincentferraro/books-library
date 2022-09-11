const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const success = require('../../helper').success
const fail = require('../../helper').fail
const User = require('../db/sequelize').User

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        
        User.findOne({ where: {username: req.body.surname}})
                    .then(result => {
                        
                                    bcrypt.compare(req.body.password, result.dataValues.password)
                                        .then(resultat => {
                                            if (resultat) {
                                                console.log(resultat)
                                                const token = jwt.sign({user: result.dataValues.username},'CUSTOM_PRIVATE_KEY',{expiresIn:'1d'})
                                                const message = 'succès'
                                                res.json({ message, result, token })
                                            } else {
                                                res.json(fail(`Identifiant ou mot de passe invalide`))
                                            }
                                            
                                        })
                                        
                
                        })
                    .catch(rej => res.json(fail("Identifiant invalide",rej)))
    })
}