const Users = require('../users/users-model')

async function checkBody(req, res, next) {
    try {
        if(!req.body.username || !req.body.password) {
            next({ status: 422, message: "username and password required"})
        } else {
            const user = await Users.findByUsername(req.body.username)
            if(!user) {
             next({ status: 422, message: "invalid credentials"})
            } else {
                req.user = user
                next()
            }   
        }

    } catch(err) {
        next({ status: 400, message: "invalid credentials" })
    }
}

module.exports = {
    checkBody
}