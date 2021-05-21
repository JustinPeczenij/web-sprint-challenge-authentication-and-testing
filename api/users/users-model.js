const db = require('../../data/dbConfig') 


async function addUser(user) {
  const id = await db('users').insert(user)
  return db('users').where('id', id).first()
}

function findByUsername(username) {
    return db('users').where('username', username).first()
}

module.exports = {
    addUser,
    findByUsername
}