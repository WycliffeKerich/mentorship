const express = require('express')

const {
  getFacility,
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility
} = require('../controllers/facility.controller')

const router = express.Router()

router.route('/').get(getFacilities).post(createFacility)

router.route('/:id').get(getFacility).put(updateFacility).delete(deleteFacility)

module.exports = router
