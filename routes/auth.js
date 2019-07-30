const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
const { handleResponse } = require('../utils');
const { MESSAGES } = require('../routes/responses');
const { findByEmail, authentication } = require('../utils');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findMe = await findByEmail(email);
        const auth = await authentication(password, findMe.password);
        if (auth) {
            const token = jwt.sign(
                { email },
                config.secret,
                { expiresIn: '24h' }
            );
            return handleResponse(200, res, {token});
        } else {
            return handleResponse(401, res, message);
        }
    } catch (error) {
        return handleResponse(400, res, MESSAGES.FAILURE_BAD_REQUEST)
    }
});

module.exports = router;
