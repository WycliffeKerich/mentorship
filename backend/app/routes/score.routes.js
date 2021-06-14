const express = require('express')

const {
  getScore,
  getScores,
  createScore,
  updateScore,
  deleteScore
} = require('../controllers/score.controller')

const router = express.Router()

router.route('/').get(getScores).post(createScore)

router.route('/:id').get(getScore).put(updateScore).delete(deleteScore)

module.exports = router
