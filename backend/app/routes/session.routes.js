const express = require('express')

const {
  getSession,
  getSessions,
  createSession,
  updateSession,
  deleteSession
} = require('../controllers/session.controller')

const router = express.Router()

router.route('/').get(getSessions).post(createSession)

router.route('/:id').get(getSession).put(updateSession).delete(deleteSession)

module.exports = router
