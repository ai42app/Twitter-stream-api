const wordPerSocketDB = require('./DB_logic/wordPerSocketDB')
let keyWords = wordPerSocketDB.getAllKeyWords()

const test = () => {
  setInterval(() => {
    wordPerSocketDB.addSocketByKeyWord(String(Math.floor(Math.random() * 10000)), 0)
    keyWords = wordPerSocketDB.getAllKeyWords()
    console.log(`Updated`, keyWords)
  }, 1000)
}

test()
