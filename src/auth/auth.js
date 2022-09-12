const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authorizationRequest = req.get('Authorization')
    console.log(authorizationRequest)

    if (!authorizationRequest) {
        res.status(400).json("Token manquant")
    }
    const tokenRequest = authorizationRequest.split(" ")
    if (!tokenRequest[1]) {
        res.status(401).json("Identifiant non autorisé")
    }
    
    jwt.verify(tokenRequest[1], 'CUSTOM_PRIVATE_KEY', (err, decode) => {
        if (err) {
            console.log(err)
            res.status(401).json("Erreur token")
        }
    })

    next()
}