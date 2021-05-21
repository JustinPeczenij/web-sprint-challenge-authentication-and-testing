const jwt = require('jsonwebtoken')

function tokenBuilder(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = 'bababooeysundae'
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

module.exports = tokenBuilder