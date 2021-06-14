const express = require('express')

const {
  getSubCounty,
  getSubCounties,
  createSubCounty,
  updateSubCounty,
  deleteSubCounty
} = require('../controllers/subcounty.controller')

const router = express.Router()

router.route('/').get(getSubCounties).post(createSubCounty)

router
  .route('/:id')
  .get(getSubCounty)
  .put(updateSubCounty)
  .delete(deleteSubCounty)

module.exports = router
