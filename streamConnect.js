require('dotenv').config()
const wordPerSocketDB = require('./DB_logic/wordPerSocketDB')
const sockets = require('./sockets')

// Open a live stream of roughly 1% random sample of publicly available Tweets
// https://developer.twitter.com/en/docs/twitter-api/tweets/volume-streams/quick-start

const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BARRER_TOKEN

const extraFields = 'expansions=author_id'
const streamURL = 'https://api.twitter.com/2/tweets/sample/stream';

// stream
function streamConnect(retryAttempt) {
  console.log(`Run, twitter stream`)

  const stream = needle.get(streamURL + `?${extraFields}`, {
    headers: {
      "User-Agent": "v2SampleStreamJS",
      "Authorization": `Bearer ${token}`
    },
    timeout: 20000
  });

  stream.on('data', data => {
    try {
      // MAIN logic here
      // parse tweet and spam if math
      const json = JSON.parse(data);
      const text = json.data.text
      const id = json.data.id
      const author_id = json.data.author_id
      const keyWords = wordPerSocketDB.getAllKeyWords()
      // console.log("Tweet text :", text);
      // console.log("keyWorlds", keyWords)

      // CHECK If tweet contain main keyword
      const isMatch = keyWords.some(keyW => String(text).toLowerCase().includes(keyW))
      if(isMatch){
        console.log("Found", "tweet :", text, "id :", id)

        const sockets = wordPerSocketDB.getSocketsBykeyWordID(text)

        for(let i = 0; i < sockets.length; i++){
          console.log("TODO should emit websocket to socket", sockets[i])
          // socket.emitTo(sockets[i], "New-Tweet", {id, text, author_id})
        }
      }

      // A successful connection resets retry count.
      retryAttempt = 0;
    } catch (e) {
      // Catches error in case of 401 unauthorized error status.
      if (data.status === 401) {
        console.log(data);
        process.exit(1);
      } else if (data.detail === "This stream is currently at the maximum allowed connection limit.") {
        console.log(data.detail)
        process.exit(1)
      } else {
        // Keep alive signal received. Do nothing.
      }
    }
  }).on('err', error => {
    if (error.code !== 'ECONNRESET') {
      console.log(error.code);
      process.exit(1);
    } else {
      // This reconnection logic will attempt to reconnect when a disconnection is detected.
      // To avoid rate limits, this logic implements exponential backoff, so the wait time
      // will increase if the client cannot reconnect to the stream.
      setTimeout(() => {
        console.warn("A connection error occurred. Reconnecting...")
        streamConnect(++retryAttempt);
      }, 2 ** retryAttempt);
    }
  });
  return stream;
}

module.exports = streamConnect

// // RUN app
// (async () => {
//   streamConnect(0)
// })();
