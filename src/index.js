require('dotenv').config();
const Telegraf = require('telegraf');
const Team = require('../team.json');
const BotToken = process.env.BOT_TOKEN;
const MaxWinners = process.env.MAX_WINNERS;

const bot = new Telegraf(BotToken);

bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start((ctx) => ctx.reply('Welcome'));
bot.hears('/luckylunch', (ctx) => {
    
    let members = [...Team];
    let count = 0;
    while(members.length > 0) {
        let winners = '';
        count++;
        for(let i = 1; i <= MaxWinners; i++) {
            winners += members.splice(Math.floor(Math.random()*members.length), 1)[0].name + ' ';
        }
        ctx.reply(`Team ${count}: ${winners}`);
    }
    
});
bot.launch();
