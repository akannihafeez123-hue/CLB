const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
const authRoutes = require('./clb_auth_routes');
const dashboardRoutes = require('./clb_dashboard_routes');
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Serve static frontend from root
const path = require('path');
app.use(express.static(__dirname));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CLB server running on port ${PORT}`));
