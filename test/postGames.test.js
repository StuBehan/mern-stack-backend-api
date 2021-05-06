const expect = require('chai').expect;
const request = require('supertest');
const testSetup = require('./helper/testSetup')
const app = require('../app')

describe('POST: api/games route to create new game entry', () => {
  testSetup();

  it('valid data', (done) => {
    let validData = { "title": "test",
                      "developer": "testdev",
                      "producer": "testprod",
                      "genre": "testgenre",
                      "operatingSystem": "testos",
                      "dateReleased": "2021-01-01"
                    }
    request(app).post('/api/games')
      .send(validData)
      .then((response) => {
        expect(response.statusCode).to.equal(201);
        expect(response.body).to.include(validData);
        done();
      })
      .catch((error) => done(error))
  })

  it('invalid data', (done) => {
    request(app).post('/api/games')
      .send({ "developer": "testdev",
              "producer": "testprod"})
      .then((response) => {
        expect(response.statusCode).to.equal(500);
        expect(response.body).to.be.an('object');
        done();
      })
      .catch((error) => done(error));
  })
})
