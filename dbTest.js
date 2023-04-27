const wordPerSocketDB = require('./DB_logic/wordPerSocketDB')

wordPerSocketDB.registerKeyWord("Cat")



wordPerSocketDB.addSocketByKeyWord("Cat", 1)


console.log(wordPerSocketDB.getUserImagesBykeyWordID("Cat"))
