const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authorizationRequest = req.get('Authorization')
    console.log(authorizationRequest)

    if (!authorizationRequest) {
        res.json("Token manquant")
    }
    const tokenRequest = authorizationRequest.split(" ")
    if (!tokenRequest[1]) {
        res.json("Identifiant non autorisé")
    }
    
    jwt.verify(tokenRequest[1], 'CUSTOM_PRIVATE_KEY', (err, decode) => {
        if (err) {
            console.log(err)
            res.json("Erreur token")
        } else {
            console.log(decode)
            
        }
    })

    next()
}