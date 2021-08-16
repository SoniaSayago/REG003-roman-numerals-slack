const supertest = require('supertest');
const { app, server } = require('../app');

const api = supertest(app);

test('should return json data', async () => {
  await api
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('should return value API', async () => {
  const response = await api.get('/');
  expect(response.body).toEqual({
    name: 'roman-numerals',
    version: '1.0.0',
  });
});

test('should fail', async () => {
  const text = { text: '' };
  await api
    .post('/')
    .send(text)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect({
      response_type: 'ephemeral',
      text: "That didn't work, enter a correct option. Please try again.",
    });
});

test('should fail', async () => {
  const text = { text: ' I ' };
  await api
    .post('/')
    .send(text)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect({
      response_type: 'ephemeral',
      text: "That didn't work, enter a correct option. Please try again.",
    });
});

test('from roman to arabigo', async () => {
  const text = { text: 'parse I' };
  await api
    .post('/')
    .send(text)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect({ response_type: 'in_channel', text: 1 });
});

test('from arabigo to romano', async () => {
  const text = { text: 'stringify 2' };
  await api
    .post('/')
    .send(text)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect({ response_type: 'in_channel', text: 'II' });
});

afterAll(() => {
  server.close();
});
