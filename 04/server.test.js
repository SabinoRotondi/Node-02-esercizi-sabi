const { application } = require('express');
const supertest = require('supertest');
const app = require('./server');
const request = supertest(app);
test('GET /', async () => {
  const response = await request
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toEqual({ msg: 'Hello' });
});