const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Hello from Express!');
    expect(res.body).toHaveProperty('status', 'ok');
  });
});

describe('GET /health', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('uptime');
  });
});

describe('POST /echo', () => {
  it('should echo back the request body', async () => {
    const payload = { hello: 'world' };
    const res = await request(app)
      .post('/echo')
      .send(payload)
      .set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.received).toEqual(payload);
  });
});