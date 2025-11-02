const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./clb_user_model');
const bot = require('./clb_telegram');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, inviteKey } = req.body;
        if(inviteKey !== process.env.INVITE_KEY) return res.status(401).send("Invalid invite key");

        const user = new User({ username });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        bot.sendMessage(process.env.ADMIN_CHAT_ID, `New CLB signup: ${username}`);
        res.json({ token });
    } catch (err) {
        res.status(500).send("Signup error: " + err.message);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if(!user) return res.status(404).send("User not found");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(500).send("Login error: " + err.message);
    }
});

module.exports = router;
