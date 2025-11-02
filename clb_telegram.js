const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Admin chat commands
bot.onText(/\/dashboard/, (msg) => {
    if(msg.chat.id != process.env.ADMIN_CHAT_ID) return;
    bot.sendMessage(msg.chat.id, "CLB Dashboard: Modules placeholder.");
});

module.exports = bot;
