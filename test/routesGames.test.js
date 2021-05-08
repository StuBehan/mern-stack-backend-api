const expect = require('chai').expect;
const request = require('supertest');
const testHelper = require('./helper/testSetup')
const connection = require('../config/db');
const app = require('../app')

testHelper.testSetup();

describe('GET Routes', () => {
  describe('GET: api/games route to return all game entries', () => {

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
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.include({ message: 'No Games found' });
      })
    })
  })

  describe('GET: api/games/:id route to return a specific game entry', () => {

    it('returns specific game', async () => {
      let id
      await request(app).get('/api/games').then(response => {
        id = response.body[0]._id
      })

      await request(app).get(`/api/games/${id}`)
      .then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.include( { title: 'Half-Life' } );
      })
    })

    it('finds no games', async () => {
      let id
      await request(app).get('/api/games').then(response => {
        id = response.body[0]._id
      })
      await connection.dbconnection().dropCollection("games")

      await request(app).get(`/api/games/${id}`)
      .then((response) => {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.include({ message: 'No Game found' });
      })
    })
  })
})

describe('POST: api/games route to create new game entry', () => {
  
  it('valid data', async () => {
    let validData = { "title": "test",
                      "developer": "testdev",
                      "producer": "testprod",
                      "genre": "testgenre",
                      "operatingSystem": "testos",
                      "dateReleased": "2021-01-01"
                    }
    await request(app).post('/api/games')
    .send(validData)
    .then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.include( { message: 'Game added successfully' } );
    })
    .catch((error) => console.log(error))
  })

  it('invalid data', async () => {
    await request(app).post('/api/games')
    .send({ "developer": "testdev",
            "producer": "testprod"})
    .then((response) => {
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.include( { message: 'Unable to add this game' } );
    })
    .catch((error) => done(error));
  })
})
