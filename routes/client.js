const express = require('express');
const db = require('../db');
const router = express.Router();
const QUERY = require('../db/queries/client');
const { RESPONSE } = require('./responses');
const bcrypt = require('bcryptjs');
const { handleResponse } = require('../utils');

router.get('/', async (req, res) => {
    try {
        const results = await db.query(QUERY.GET);
        return handleResponse(200, res, results)
    } catch (error) {
        return handleResponse(400, res, MESSAGE.FAILURE_BAD_REQUEST)
    }
});

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = bcrypt.hashSync(req.body.password);
        const results = await db.query(QUERY.POST, [email, password]);
        return handleResponse(200, res, SUCCESFULL_OK);
    } catch (error) {
        return handleResponse(400, res, MESSAGE.FAILURE_BAD_REQUEST);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query(QUERY.DELETE, [req.params.id])
        return handleResponse(200, res, SUCCESFULL_OK);
    } catch (error) {
        return handleResponse(400, res, MESSAGE.FAILURE_BAD_REQUEST);
    }
});

module.exports = router;
