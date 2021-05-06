const mongoose = require('mongoose');
const connection = require('../../config/db');

let testSetup = () => {
  before((done) => {
    connection.dbconnect()
    .then(() => done())
    .catch((error) => done(error));
  })
  
  beforeEach((done) => {
    const collectionName = 'gamesCollection';
    mongoose.connection.db.listCollections({ name: "gamesCollection" })
      .next((error, collection) => {
        if(collection){
          mongoose.connection.db.dropCollection("gamesCollection")
          .then(() => done())
          .catch((error) => done(error))
          }
        else {
          done(error)
        }
      })
  })

  after((done) => {
    connection.dbclose()
    .then(() => done())
    .catch((error) => done(error))
  })
}

module.exports = testSetup;