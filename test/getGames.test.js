const expect = require('chai').expect;
const request = require('supertest');
const testSetup = require('./helper/testSetup')
const connection = require('../config/db');
const testData = require('./helper/testData.json')
const app = require('../app')

describe('GET: api/games route to return all game entries', () => {
  testSetup();

  it('returns all games', async () => {
    await request(app).get('/api/games')
    .then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body[0]).to.include( { title: 'Half-Life' } );
    })
  })

  it('finds no games', async () => {
    await connection.dbconnection().dropCollection("games")

    await request(app).get('/api/games')
    .then((response) => {
      console.log(response.body)
      expect(response.statusCode).to.equal(404);
      expect(response.message).to.include(/No Games found/);
    })
  })
})
