const express = require('express')

const {
  getMentor,
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor
} = require('../controllers/mentor.controller')

const router = express.Router()

router.route('/').get(getMentors).post(createMentor)

router.route('/:id').get(getMentor).put(updateMentor).delete(deleteMentor)

module.exports = router
