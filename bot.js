require('dotenv').config();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const randomPhraseList = require('./constants');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `
Привет ${ctx.message.from.first_name}!
Ты можешь рассказать мне все плохое, а я тебя поддержу
`
  )
);

// bot.help((ctx) => ctx.reply(COUNTRIES_LIST));

bot.on('text', async (ctx) => {
            let data = {};

              function ajax_get(url, callback) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log('responseText:' + xmlhttp.responseText);
                    try {
                      var data = JSON.parse(xmlhttp.responseText);
                    } catch (err) {
                      // console.log(err.message + " in " + xmlhttp.responseText);
                      return;
                    }
                    callback(data);
                  }
                };
              
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
              }
              
              ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
                // console.log(data)
                ctx.reply(`${randomPhraseList[Math.floor(Math.random() * randomPhraseList.length)]} ${data[0].url}`);
              });

});
bot.launch();

// eslint-disable-next-line no-console
console.log('Бот запущен');
