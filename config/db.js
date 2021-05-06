const mongoose = require('mongoose');
const config = require('config');
const dbDev = config.get('mongoDevURI');
const dbTest = config.get('mongoTestURI');

const dbconnect = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === 'test' ? dbTest : dbDev,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    console.log('MongoDB is Connected...');
    console.log(process.env.NODE_ENV)
  } 
  catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const dbclose = async () => {
  try {
    await mongoose.disconnect()
    console.log('MongoDB is Disconnected...')
  } 
  catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { dbconnect, dbclose };