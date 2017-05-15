var http = require('http');
var fs = require('fs');

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
            callback(parsed.CHF);
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
            callback(parsed.price.chf);
        });

    });

}

getCurrentBTC(function(chf) {
  console.log(chf);
});
getCurrentETH(function(eth) {
  console.log(eth);
});
