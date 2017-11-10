# CoinBot
A small node script that will send a 1 time message to telegram


## Setup
- Clone the repo `git clone https://github.com/Hoi15A/CoinBot.git`
- Run `npm install`
- Copy `example.telegram.json` to `telegram.json`
- In `telegram.json` change `token` to your telegram bot token and `chat` to a chat or channel id. Under `crypto` you can specify an array of cryptocurrencies to be sent by the bot and with `currency` you can set the currency it should convert the value of the crypto to. (both need to be available on the [coinmarketcap.com api](https://api.coinmarketcap.com/v1/ticker/))
- Run `node btc.js` in a cronjob at whatever interval you like
