const connection = require('../../config/db');
const request = require('supertest');
const app = require('../../app')
const testData = require('./testData.json')

let testSetup = () => {

  before( async () => {
    await connection.dbconnect()
  })
  
  beforeEach( async () => {
    for (let i = 0; i < testData.gamesData.length; i ++) {
      await request(app).post('/api/games').send(testData.gamesData[i]);
    }
  })
  
  afterEach((done) => {
    connection.dbconnection().listCollections({ name: "games" })
    .next((error, collection) => {
      if(collection){
        connection.dbconnection().dropCollection("games")
        .then(() => done())
        .catch((error) => done(error));
        }
      else {
        done(error);
      }
    })
  })

  after( async () => {
    await connection.dbclose()
  })
}

module.exports = testSetup;