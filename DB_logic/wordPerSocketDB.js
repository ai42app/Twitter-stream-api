// DB used
// https://www.npmjs.com/package/simple-json-db
const JSONdb = require('simple-json-db')
const db = new JSONdb('DB_storage/wordPerSocketDBStorage')

exports.iskeyWordIDRegistred = (keyWordID) => {
  return db.has(String(keyWordID).toLowerCase())
}

exports.registerKeyWord = (keyWordID) => {
  if(!db.has(String(keyWordID).toLowerCase())){
    db.set(String(keyWordID).toLowerCase(), [])
    return true
  }
  else{
    return false
  }
}

exports.addSocketByKeyWord = (keyWordID, socket) => {
  let sockets = db.get(String(keyWordID).toLowerCase())

  if(!sockets)
    sockets = []

  if(sockets.includes(socket))
    return

  sockets.push(socket)

  db.set(String(keyWordID).toLowerCase(), sockets)
}

exports.getUserImagesBykeyWordID = (keyWordID) => {
  if(!db.has(String(keyWordID).toLowerCase()))
    return []

  return db.get(String(keyWordID).toLowerCase())
}
