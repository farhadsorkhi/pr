const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const users = {};

// Function to log OTP, secret, and username
function logOTP(username, otp, secret) {
    const logMessage = `User: ${username}, OTP: ${otp}, Secret: ${secret}, Timestamp: ${new Date().toISOString()}\n`;
    fs.appendFile(path.join(__dirname, 'otp_logs.txt'), logMessage, (err) => {
        if (err) {
            console.error('Error writing OTP log:', err);
        } else {
            console.log('Logged OTP:', logMessage.trim());
        }
    });
}

// Endpoint to get OTP for a user
app.post('/get-otp', (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send('Username is required');
    }

    // Generate a new secret if the user doesn't already have one
    if (!users[username]) {
        users[username] = speakeasy.generateSecret({ length: 20 }).base32;
    }

    const secret = users[username];
    const token = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        step: 10
    });

    // Log OTP, secret, and username simultaneously with client
    logOTP(username, token, secret);

    res.json({ username, otp: token, secret });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
