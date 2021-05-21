const Users = require('../users/users-model')

async function checkBody(req, res, next) {
    if(!req.body.username || !req.body.password) {
        next({ status: 422, message: "username and password required"})
    } else {
        try{
            const user = await Users.findByUsername(req.body.username)
            user 
            ? next({ status: 403, message: "username taken"})
            : next()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = {
    checkBody
}