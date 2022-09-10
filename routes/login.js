
module.exports = (app, User,success,fail,bcrypt) => {
    app.post('/api/login', (req, res) => {
        const surname = req.body.surname
        const password = req.body.password
        console.log(surname, password)

        User.findOne({
                    where: {
                        username: surname
                    }
                    })
                    .then(result => {
                        
                                    bcrypt.compare(password, result.dataValues.password)
                                        .then(resultat => {
                                            if (resultat) {
                                                res.json(success(`Connexion avec succès, Bienvenue ${result.dataValues.username}`))
                                            } else {
                                                res.json(fail(`Identifiant ou mot de passe invalide`))
                                            }
                                            
                                        })
                                        
                
                        })
                    .catch(rej => res.json(fail("Identifiant invalide",rej)))
    })
}