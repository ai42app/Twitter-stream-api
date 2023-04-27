const wordPerSocketDB = require('./DB_logic/wordPerSocketDB')


wordPerSocketDB.addSocketByKeyWord("Happy", 0)

console.log(wordPerSocketDB.getSocketsBykeyWordID("DOG"))

console.log(wordPerSocketDB.getAllKeyWords())
