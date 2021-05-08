const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const dbconnect = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
    console.log('DB connection env is:', process.env.NODE_ENV)
  } 
  catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const dbconnection = () => {
  return mongoose.connection.db
}

const dbclose = async () => {
  try {
    await mongoose.disconnect()
    console.log('MongoDB is Disconnected...')
  } 
  catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = { dbconnect, dbclose, dbconnection };