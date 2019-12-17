const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');

describe('server.js', () => {
    describe('POST /register', () => {
        it('should return 201 created', async () => {
            const user = {username: "test", password: "password"}
            const res = await request(server).post('/api/auth/register').send(user);
            expect(res.status).toBe(201);
        });
        it('should return JSON', async () => {
            const user = {username: "sabrina", password: "password"}
            const res = await request(server).post('/api/auth/register').send(user);
            expect(res.type).toBe('application/json');
        })

        beforeEach(async () => {
            await db("users").truncate();
          });
    });

    describe('POST /login', () => {
        it('should return 200 OK', async () => {
            const user = {username: "sabrina", password: "password"}
            const res = await request(server).post('/api/auth/login').send(user);
            expect(res.status).toBe(200);
        })

        it('should generate a token for the user', async () => {
            const user = {username: "test", password: "password"}
            const res = await request(server).post('/api/auth/login').send(user);
            console.log(res.body)
            expect(res.body.token).toBeTruthy();
        })
    })

})