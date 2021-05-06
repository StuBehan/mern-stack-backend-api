const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  developer: {
    type: String,
    required: true
  },
  producer: {
    type: String
  },
  genre: {
    type: String
  },
  operatingSystem: {
    type: String
  },
  dateReleased: {
    type: Date
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model('game', GameSchema);