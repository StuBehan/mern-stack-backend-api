const express = require('express');
const router = express.Router();

const Game = require('../../models/game');

// route GET api/games
router.get('/', (request, response) => {
  Game.find()
    .then(games => {
      if (Object.keys(games).length) {
        response.json(games)
      } else {
        response.json({ games, message: 'No Games found' })
      }
    }) 
    .catch(error => response.status(404).json({ message: 'No Games found', error: error }));
});

// route GET api/games
router.get('/:id', (request, response) => {
  Game.findById(request.params.id)
    .then(game => {
      if (Object.keys(game).length) {
        response.json(game)
      } else {
        response.json({ game, message: 'No Games found' })
      }
    }) 
    .catch(error => response.status(404).json({ message: 'No Game found', error: error }));
});

// route POST api/games
router.post('/', (request, response) => {
  Game.create(request.body)
    .then(game => response.json({ message: 'Game added successfully', game: game }))
    .catch(error => response.status(400).json({ message: 'Unable to add this game', error: error }));
});

// route PUT api/games/:id
router.put('/:id', (request, response) => {
  Game.findByIdAndUpdate(request.params.id, request.body)
    .then(game => response.json({ msg: 'Updated Successfully', game: game }))
    .catch(error => response.status(400).json({ error: 'Unable to update the database', error: error }));
});

// route DELETE api/games/:id
router.delete('/:id', (request, response) => {
  Game.findByIdAndRemove(request.params.id, request.body)
    .then(game => response.json({ message: 'Game deleted successfully', game: game }))
    .catch(error => response.status(404).json({ error: 'No such Game', error: error}));
});

module.exports = router;