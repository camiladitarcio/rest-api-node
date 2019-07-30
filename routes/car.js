var express = require('express');
const db = require('../db');
const router = express.Router();
const QUERY = require('../db/queries/cars');
const {RESPONSE, MESSAGES} = require('./responses');
const carSchema = require('../const/schema');
const { findById, isValidSchema, isValidSchemaPost, isValidYear, isNullObject, handleResponse } = require('../utils');


router.get('/', async (req, res) => {
    try {
        const results = await db.query(QUERY.GET);
        return handleResponse(200, res, results.rows);
    } catch (error) {
        return handleResponse(400, res, MESSAGES.FAILURE_BAD_REQUEST);
    }
});

router.post('/', async (req, res) => {
    try {
        const isValidSchema = isValidSchemaPost(req.body, carSchema);
        const isValidBody = isNullObject(req.body);
        if (isValidSchema && isValidBody) {
            const { make, year, model, fueltype, trim, colors } = req.body;
            if (isValidYear(year)) {
                const results = await db.query(QUERY.POST, [make, year, model, fueltype, trim, colors]);
                return handleResponse(200, res, results.rows);
            } else {
                return handleResponse(400, res, MESSAGES.FAILURE_INVALID_YEAR)
            }
        } else {
            return handleResponse(400, res, MESSAGES.FAILURE_BAD_SCHEMA)
        }
    } catch (error) {
        return handleResponse(400, res, MESSAGES.FAILURE_BAD_REQUEST)
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const isIdExist = await findById(req.params.id);
        if (!isIdExist) {
            return handleResponse(404, res)
        }
        const schema = isValidSchema(req.body, carSchema);
        if (schema) {
            const { make, year, model, fueltype, trim, colors } = req.body;
            if (isValidYear(year)) {
                await db.query(QUERY.PATCH, [make, year, model, fueltype, trim, colors, req.params.id]);
                return handleResponse(200, res, {
                    id: req.params.id,
                    make,
                    year,
                    model,
                    fueltype,
                    trim,
                    colors
                })
            } else {
                return handleResponse(400, res, MESSAGES.FAILURE_INVALID_YEAR)
            }
        } else {
            return handleResponse(400, res, MESSAGE.FAILURE_BAD_SCHEMA)
        }
    } catch (error) {
        console.log(error)
        return handleResponse(400, res, MESSAGES.FAILURE_BAD_REQUEST)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const isIdExist = await findById(req.params.id);
        if (!isIdExist) {
            return handleResponse(404, res)
        }
        const schema = await isValidSchema(req.body, carSchema)
        if (schema) {
            const { make, year, model, fueltype, trim, colors } = req.body
            if (isValidYear(year)) {
                const results = await db.query(QUERY.PUT, [make, year, model, fueltype, trim, colors, req.params.id]);
                return handleResponse(200, res, {
                    id: req.params.id,
                    make,
                    year,
                    model,
                    fueltype,
                    trim,
                    colors
                })
            } else {
                return handleResponse(400, res, MESSAGE.FAILURE_INVALID_YEAR)
            }
        } else {
            return handleResponse(400, res, MESSAGE.FAILURE_BAD_SCHEMA)
        }
    } catch (error) {
        return handleResponse(400, res, MESSAGES.FAILURE_BAD_REQUEST)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const isIdExist = await findById(req.params.id);
        if (!isIdExist) {
            return handleResponse(404, res)
        }
        await db.query(QUERY.DELETE, [req.params.id]);
        return handleResponse(200, res, {
            id: req.params.id
        })
    } catch (error) {
        return handleResponse(400, res, MESSAGES.FAILURE_BAD_REQUEST)
    }
});



module.exports = router;
