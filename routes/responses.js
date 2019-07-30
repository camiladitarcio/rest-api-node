const RESPONSE = {
    SUCCESFULL_OK: (results) => { //200 SUCCESFULL
        return {
            status: 200,
            message: "SUCCESFULL_OK",
            data: results
        }
    },
    FAILURE_BAD_REQUEST: (message, error) => { //400 BAD REQUEST
        return {
            status: 400,
            message,
            error
        }
    },

    FAILURE_UNAUTHORIZE: (error) => { // 401 UNAUTHORIZED
        return {
            status: 401,
            message: "FAILURE_UNAUTHORIZE", // bad token
            error
        }
    },

    FAILURE_CANT_FIND: (error) => { // 404 ID CANT FIND
        return {
            status: 404,
            message: "FAILURE_ID_NOT_FOUND",
            error
        }
    }
};
const MESSAGES = {
    FAILURE_BAD_REQUEST: "FAILURE_BAD_REQUEST",
    FAILURE_BAD_SCHEMA: "FAILURE_BAD_SCHEMA",
    FAILURE_BAD_SCHEMA_NULL_VALUES: "FAILURE_BAD_SCHEMA_NULL_VALUES",
    FAILURE_INVALID_YEAR: "INVALID_YEAR",
    FAILURE_BAD_TOKEN: "INVALID_TOKEN" // null token
}

module.exports = { RESPONSE, MESSAGES };