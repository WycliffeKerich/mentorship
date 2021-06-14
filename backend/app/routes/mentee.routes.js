const express = require('express')

const {
  getMentee,
  getMentees,
  createMentee,
  updateMentee,
  deleteMentee
} = require('../controllers/mentee.controller')

const router = express.Router()

router.route('/').get(getMentees).post(createMentee)

router.route('/:id').get(getMentee).put(updateMentee).delete(deleteMentee)

module.exports = router
