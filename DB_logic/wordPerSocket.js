// DB used
// https://www.npmjs.com/package/simple-json-db
const JSONdb = require('simple-json-db')
const db = new JSONdb('DB_storage/users.json')

exports.iskeyWordIDRegistred = (keyWordID) => {
  return db.has(keyWordID)
}

exports.registerKeyWord = (keyWordID) => {
  if(!db.has(keyWordID)){
    db.set(keyWordID, [])
    return true
  }
  else{
    return false
  }
}

exports.addSocketByKeyWord = (keyWordID, socket) => {
  let sockets = db.get(keyWordID)

  if(!sockets)
    sockets = []

  sockets.push(socket)

  db.set(keyWordID, sockets)
}

exports.getUserImagesBykeyWordID = (keyWordID) => {
  if(!db.has(keyWordID))
    return []

  return db.get(keyWordID)
}
