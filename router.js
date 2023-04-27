require('dotenv').config()
const express = require('express')
const router = express.Router()
const wordPerSocketDB = require('./DB_logic/wordPerSocketDB')


router.get('/', function(req, res) {
    res.json({ message: 'API is Online!' })
})

router.route('/register-key-word').post(async function(req, res) {
   const keyWord = req.body.keyWord

   if(!keyWord)
     return res.status(400).send("Bad request")

   try{
     wordPerSocketDB.registerKeyWord(keyWord)
     return res.status(200).send("Success")
   }catch(e){
     return res.status(500).send("Server error")
   }
})


router.route('/register-socket-by-keyword').post(async function(req, res) {
   const keyWord = req.body.keyWord
   const socket = req.body.socket

   console.log(keyWord, socket)

   if(!keyWord || !socket)
     return res.status(400).send("Bad request")

   try{
     wordPerSocketDB.addSocketByKeyWord(keyWord, socket)
     return res.status(200).send("Success")
   }catch(e){
     return res.status(500).send("Server error")
   }
})


module.exports = router
