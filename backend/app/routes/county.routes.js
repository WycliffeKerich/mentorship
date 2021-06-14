const express = require('express')

const {
  getCounty,
  getCounties,
  createCounty,
  updateCounty,
  deleteCounty
} = require('../controllers/county.controller')

const router = express.Router()

router.route('/').get(getCounties).post(createCounty)

router.route('/:id').get(getCounty).put(updateCounty).delete(deleteCounty)

module.exports = router
