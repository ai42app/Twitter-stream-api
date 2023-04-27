const wordPerSocketDB = require('./DB_logic/wordPerSocketDB')


wordPerSocketDB.addSocketByKeyWord("CAT", 0)

console.log(wordPerSocketDB.getSocketsBykeyWordID("CAT"))

console.log(wordPerSocketDB.getAllKeyWords())
