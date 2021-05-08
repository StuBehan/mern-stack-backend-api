const expect = require('chai').expect;
const request = require('supertest');
const testSetup = require('./helper/testSetup')
const app = require('../app')

describe('POST: api/games route to create new game entry', () => {
  testSetup();

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
