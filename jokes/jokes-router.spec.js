const request = require('supertest');
const server = require('../api/server.js');

describe('GET /jokes', () => {
    it('should return 401 for unauthorized users', async () => {
        const res = await request(server).get('/api/jokes');
        console.log(res.status);
        expect(res.status).toBe(401);
    })

    it("should be a json response", async () => {
        const res = await request(server).get("/api/jokes");

        expect(res.type).toBe("application/json");
      });
})