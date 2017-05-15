var http = require('http');



function getCurrentBTC(callback) {
  //https://blockchain.info/en/ticker

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
  //https://coinmarketcap-nexuist.rhcloud.com/api/eth
  
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
