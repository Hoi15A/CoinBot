var http = require('http');
var fs = require('fs');
var request = require('request');

var tg = JSON.parse(fs.readFileSync('telegram.json', 'utf8'));

console.log("Bot token: " + tg.token);
console.log("Chat/Channel: " + tg.chat + "\n");

function getCurrentBTC(callback) {

  return http.get({
        host: 'blockchain.info',
        path: '/en/ticker'
    }, function(response) {

        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed.CHF.buy.toFixed(2));
        });

    });

}

function getCurrentETH(callback) {

  return http.get({
        host: 'coinmarketcap-nexuist.rhcloud.com',
        path: '/api/eth'
    }, function(response) {

        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            callback(parsed.price.chf.toFixed(2));
        });

    });

}

function sendToTelegram(message) {
  var url = "https://api.telegram.org/bot" + tg.token + "/sendMessage"
  request.post(
    url,
    { json: {
      chat_id: tg.chat,
      text: message,
      parse_mode: "Markdown",
      disable_web_page_preview: true
    } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);

}

getCurrentBTC(function(chf) {
  var msg = "`1` *Bitcoin* is worth `" + chf + "` *CHF*\n";
  getCurrentETH(function(chf) {
    msg += "`1` *Ethereum* is worth `" + chf + "` *CHF* ";
    sendToTelegram(msg);
  });
});
