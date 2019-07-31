const request = require("supertest");
const mocha = require("mocha");
const app = require("../app");
const { getLastId } = require('../utils');
const { AUTH, TOKEN, CAR } = require('../fixtures/mocks');

let token = "";
const inexistentId = 90000;

////////////* AUTH *////////////// 
//////// ///* post *//////////////
describe(`POST ${AUTH.END_POINT}`, () => {
    it('shoul return 200', async () => {
        const result = await request(app)
        .post(`${AUTH.END_POINT}`)
        .send(AUTH.USER)
        .expect(200) // ok
        token = result.body.data.token
    })
});

////////////* CARS *////////////// 
////////////* get *///////////////
describe(`GET ${CAR.END_POINT}`, () => {
    it ('should return 200', async () => {
        await request(app)
        .get(CAR.END_POINT)
        .set('key', token)
        .expect(200) // ok
    })
    it('should return 400', async () => {
        await request(app)
        .get(`${CAR.END_POINT}`)
        .set('key',TOKEN.NULL) 
        .expect(400) // null token
    })
    it ('should return 401', async () => {
        await request(app)
        .get(CAR.END_POINT)
        .set('key', TOKEN.FALSE) 
        .expect(401) // bad token
    })
});

////////////* post *////////////// 
describe(`POST ${CAR.END_POINT}`, () => {
    it ('should return 200', async () => {
        await request(app)
        .post(`${CAR.END_POINT}`)
        .set('key', token)
        .send(CAR.TRUE)
        .expect(200) // ok
    })
    it('should return 400', async () => {
        await request(app)
        .post(`${CAR.END_POINT}`)
        .send(CAR.FALSE)
        .expect(400) // bad schema
    })
    it('should return 400', async () => {
        await request(app)
        .post(`${CAR.END_POINT}`)
        .send(CAR.NULL)
        .expect(400) // null values
    })
    it ('should return 401', async () => {
        await request(app)
        .post(`${CAR.END_POINT}`)
        .set('key', TOKEN.FALSE) 
        .send(CAR.TRUE)
        .expect(401) // bad token
    })
    it ('should return 400', async () => {
        await request(app)
        .post(`${CAR.END_POINT}`)
        .set('key', TOKEN.NULL) 
        .send(CAR.TRUE)
        .expect(400) // null token
    })
});

////////////* patch *////////////// 
describe(`PATCH ${CAR.END_POINT}`, () => {
    it('should return 200', async () => {
        const id = await getLastId();
        await request(app)
        .patch(`${CAR.END_POINT}/${id}`)
        .set('key', token)
        .send(CAR.PATCH_PUT)
        .expect(200) // ok
    })
    it('should return 400', async () => {
        const id = await getLastId();
        await request(app)
        .patch(`${CAR.END_POINT}/${id}`)
        .send(CAR.FALSE)
        .expect(400) // bad schema
    })
    it('should return 401', async () => {
        const id = await getLastId();
        await request(app)
        .patch(`${CAR.END_POINT}/${id}`)
        .set('key', TOKEN.FALSE) 
        .send(CAR.PATCH_PUT)
        .expect(401) // bad token
    })
    it('should return 400', async () => {
        const id = await getLastId();
        await request(app)
        .patch(`${CAR.END_POINT}/${id}`)
        .set('key', TOKEN.NULL) 
        .send(CAR.PATCH_PUT)
        .expect(400) // null token
    })
    it('should return 404', async () => {
        await request(app)
        .patch(`${CAR.END_POINT}/${inexistentId}`)
        .set('key', token)
        .expect(404) // inexistent id
        console.log(inexistentId)
    })
});

////////////* put *////////////// 
describe(`PUT ${CAR.END_POINT}`, () => {
    it('should return 200', async () => {
        const id = await getLastId();
        await request(app)
        .put(`${CAR.END_POINT}/${id}`)
        .set('key', token)
        .send(CAR.PATCH_PUT)
        .expect(200) // ok   
    })
    it('should return 400', async () => {
        const id = await getLastId();
        await request(app)
        .put(`${CAR.END_POINT}/${id}`)
        .send(CAR.FALSE)
        .expect(400) // bad schema
    })
    it('should return 401', async () => {
        const id = await getLastId();
        await request(app)
        .put(`${CAR.END_POINT}/${id}`)
        .set('key', TOKEN.FALSE) 
        .send(CAR.PATCH_PUT)
        .expect(401) // bad token
    })
    it('should return 400', async () => {
        const id = await getLastId();
        await request(app)
        .put(`${CAR.END_POINT}/${id}`)
        .set('key', TOKEN.NULL) 
        .send(CAR.PATCH_PUT)
        .expect(400) // null token   
    })
    it('should return 404', async () => {
        await request(app)
        .put(`${CAR.END_POINT}/${inexistentId}`)
        .set('key', token)
        .expect(404) // inexistent id
    })
});

////////////* delete *////////////// 
describe(`DELETE ${CAR.END_POINT}`, () => {
    it('should return 200', async () => {
        const id = await getLastId();
        await request(app)
        .delete(`${CAR.END_POINT}/${id}`)
        .set('key', token)
        .expect(200) // ok
    })
    it('should return 401', async () => {
        const id = await getLastId();
        await request(app)
        .delete(`${CAR.END_POINT}/${id}`)
        .set('key', TOKEN.FALSE)
        .expect(401) // bad token 
    })
    it('should return 400', async () => {
        const id = await getLastId();
        await request(app)
        .delete(`${CAR.END_POINT}/${id}`)
        .set('key', TOKEN.NULL)
        .expect(400) // null token
    })
    it('should return 404', async () => {
        await request(app)
        .delete(`${CAR.END_POINT}/${inexistentId}`)
        .set('key', token) 
        .expect(404) // inexistent id
    })
});
