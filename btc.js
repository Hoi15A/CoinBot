var fs = require('fs')
var path = require('path')
var request = require('request')

var tg = JSON.parse(fs.readFileSync(path.join(__dirname, '/telegram.json'), 'utf8'))

console.log('Bot token: ' + tg.token)
console.log('Chat/Channel: ' + tg.chat)
console.log('Cryptocurrencies: ' + tg.crypto)
console.log('Currency: ' + tg.currency + '\n')

function getCoinValues (callback) {
  const options = {
    url: 'https://api.coinmarketcap.com/v1/ticker/',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8'
    },
    qs: {
      convert: tg.currency
    }
  }

  request(options, function (err, res, body) {
    if (err) {
      console.error(err)
      sendToTelegram('An error occured, please check the log.')
      return
    }
    let data = JSON.parse(body)
    callback(data)
  })
}

function sendToTelegram (message) {
  var url = 'https://api.telegram.org/bot' + tg.token + '/sendMessage'
  request.post(
    url,
    { json: {
      chat_id: tg.chat,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true
    } },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body)
      }
    })
}

getCoinValues(function (data) {
  var message = []
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < tg.crypto.length; j++) {
      if (data[i].symbol === tg.crypto[j]) {
        message.push('1 *' + data[i].name + '* is worth ' + parseFloat(data[i]['price_' + tg.currency.toLowerCase()]).toFixed(2) + ' *' + tg.currency + '*')
      }
    }
  }
  sendToTelegram(message.join('\n'))
})
