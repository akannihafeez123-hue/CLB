const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./clb_user_model');
const bot = require('./clb_telegram');

// Signup
router.post('/signup', async (req, res) => {
    const { username, inviteKey } = req.body;
    if(inviteKey !== process.env.INVITE_KEY) return res.status(401).send("Invalid invite key");

    const user = new User({ username });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Notify admin via Telegram
    bot.sendMessage(process.env.ADMIN_CHAT_ID, `New CLB signup: ${username}`);

    res.json({ token });
});

// Login
router.post('/login', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if(!user) return res.status(404).send("User not found");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

module.exports = router;
