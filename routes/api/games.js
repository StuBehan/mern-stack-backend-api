const express = require('express');
const router = express.Router();

const Game = require('../../models/game');

// @route GET api/games/test
// @description tests games route
// @access Public
router.get('/test', (req, res) => res.send('game route testing'));

// @route GET api/games
// @description Get all games
// @access Public
router.get('/', (req, res) => {
  Game.find()
    .then(games => res.json(games))
    .catch(error => res.status(404).json({ nogamesfound: 'No Games found' }));
});

// @route GET api/games
// @description Get individual game by :id
// @access Public
router.get('/:id', (req, res) => {
  Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(error => res.status(404).json({ nogamefound: 'No Game found' }));
});

// @route POST api/games
// @description Add game
// @access Public
router.post('/', (req, res) => {
  Game.create(req.body)
    .then(game => res.json({ msg: 'Game added successfully' }))
    .catch(error => res.status(400).json({ error: 'Unable to add this game' }));
});

// @route PUT api/games/:id
// @description Update game
// @access Public
router.put('/:id', (req, res) => {
  Game.findByIdAndUpdate(req.params.id, req.body)
    .then(game => res.json({ msg: 'Updated Successfully' }))
    .catch(error => res.status(400).json({ error: 'Unable to update the database' }));
});

// @route DELETE api/games/:id
// @description Delete game by :id
// @access Public
router.delete('/:id', (req, res) => {
  Game.findByIdAndRemove(req.params.id, req.body)
    .then(game => res.json({ message: 'Game deleted successfully' }))
    .catch(error => res.status(404).json({ error: 'No such Game'}));
});

module.exports = router;