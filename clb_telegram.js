const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const path = require('path');

// Explicit safe imports using __dirname
const aiModule1 = require(path.join(__dirname, 'clb_ai_module1.js'));
const aiModule2 = require(path.join(__dirname, 'clb_ai_module2.js'));

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Admin commands
bot.onText(/\/dashboard/, (msg) => {
    if(msg.chat.id != process.env.ADMIN_CHAT_ID) return;
    bot.sendMessage(msg.chat.id, `CLB Dashboard:
- AI Module 1: ${aiModule1.status}
- AI Module 2: ${aiModule2.status}`);
});

bot.onText(/\/run_ai1/, async (msg) => {
    if(msg.chat.id != process.env.ADMIN_CHAT_ID) return;
    bot.sendMessage(msg.chat.id, "Running AI Module 1...");
    const result = await aiModule1.runTask();
    bot.sendMessage(msg.chat.id, `AI Module 1 completed: ${result}`);
});

bot.onText(/\/run_ai2/, async (msg) => {
    if(msg.chat.id != process.env.ADMIN_CHAT_ID) return;
    bot.sendMessage(msg.chat.id, "Running AI Module 2...");
    const result = await aiModule2.runTask();
    bot.sendMessage(msg.chat.id, `AI Module 2 completed: ${result}`);
});

module.exports = bot;
