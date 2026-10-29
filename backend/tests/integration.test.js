const request = require('supertest');

// Mock User model so integration tests do not block on remote MongoDB connections
jest.mock('../models/User', () => {
  const mockUserInstance = {
    _id: 'mock-user-id-123',
    username: 'Ravi Test',
    email: 'testuser@gmail.com',
    authProvider: 'google',
    save: jest.fn().mockResolvedValue(true),
    toObject: function() {
      return { _id: this._id, username: this.username, email: this.email, authProvider: this.authProvider };
    }
  };

  const MockUserModel = jest.fn().mockImplementation(() => mockUserInstance);
  MockUserModel.findOne = jest.fn().mockImplementation(({ email }) => {
    if (email === 'nonexistent@example.com') {
      return Promise.resolve(null);
    }
    return Promise.resolve(null);
  });
  MockUserModel.findById = jest.fn().mockResolvedValue(null);
  MockUserModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

  return MockUserModel;
});

const app = require('../server');

describe('FitAI API Integration Tests', () => {
  test('GET /api/health returns online status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('online');
    expect(res.body.service).toContain('FitAI');
  });

  test('GET /api/ai/corpus returns approved knowledge base sources', async () => {
    const res = await request(app).get('/api/ai/corpus');
    expect(res.status).toBe(200);
    expect(res.body.corpusId).toBe('fitai_demo_v1');
    expect(res.body.documentsCount).toBeGreaterThan(0);
    expect(Array.isArray(res.body.documents)).toBe(true);
  });

  test('POST /api/ai/answer returns 400 when question or goal is invalid', async () => {
    const res = await request(app)
      .post('/api/ai/answer')
      .send({ question: "hi", goal: "invalid-goal" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /api/register returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: "test@example.com" });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/provide username, email, and password/i);
  });

  test('POST /api/login returns 400 when credentials are invalid', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: "nonexistent@example.com", password: "wrong" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid Credentials");
  });

  test('POST /api/auth/google returns 400 when credential token is missing', async () => {
    const res = await request(app)
      .post('/api/auth/google')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Missing Google credential/i);
  });

  test('POST /api/auth/google handles valid test Google payload safely', async () => {
    const testPayload = {
      sub: "google-test-sub-123456",
      email: "testuser@gmail.com",
      name: "Ravi Shankar Test",
      picture: "https://lh3.googleusercontent.com/test-pic"
    };
    const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString('base64');
    const body = Buffer.from(JSON.stringify(testPayload)).toString('base64');
    const fakeGoogleToken = `${header}.${body}.fakesignature`;

    const res = await request(app)
      .post('/api/auth/google')
      .send({ credential: fakeGoogleToken });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("testuser@gmail.com");
  });
});
