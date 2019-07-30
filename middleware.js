const jwt = require('jsonwebtoken');
const config = require('./routes/config');
const { MESSAGES } = require('./routes/responses');
const { handleResponse, getToken } = require('./utils');

const checkToken = (req, res, next) => {
    const token = req.headers.key;
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                console.log(err)
                return handleResponse(401, res, MESSAGES.FAILURE_UNAUTHORIZE); // devuelve error cuando el token está MAL (no devuelve)
            } else {
                req.decoded = decoded;
                next()
            }
        })
    } else {
        return handleResponse(400, res, MESSAGES.FAILURE_BAD_TOKEN); // devuelde error cuando el token está VACÍO
    }
};


module.exports = { checkToken: checkToken };