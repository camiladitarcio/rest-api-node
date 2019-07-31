const AUTH = {
    USER: {
        email: 'camila@camila.com',
        password: 'hello'
    },
    END_POINT: '/auth'
}

const TOKEN = {
    FALSE: "eyJhbGIUzI1NiI9.eyJlbWwiA4ODB9.VwAJUjq_4ObXNVG0",
    NULL: ""
}

const CAR = {
    TRUE: {
        make: 'testtest',
        year: 2000,
        model: 'testtest',
        fueltype: 'testtest',
        trim: 'testtest',
        colors: 'testtest'       
    },
    FALSE: {
        id: 0,
        fefefe: 'testtest',
        year: 2000,
        model: 'testtest',
        fafafa: 'testtest',
        trim: 'testtest',
        colors: 'testtest'
    },
    NULL: {
        id: null,
        make: null,
        year: null,
        model: null,
        fueltype: null,
        trim: null,
        colors: null
    },
    PATCH_PUT: {
        colors: 'red',
        model: 'test'       
    },
    END_POINT: '/car',
    INEXISTENT_ID: 200000000000
}

module.exports = {AUTH, TOKEN, CAR};