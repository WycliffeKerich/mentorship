const express = require('express')

const {
  getSignalFunction,
  getSignalFunctions,
  createSignalFunction,
  updateSignalFunction,
  deleteSignalFunction
} = require('../controllers/signalfunction.controller')

const router = express.Router()

router.route('/').get(getSignalFunctions).post(createSignalFunction)

router
  .route('/:id')
  .get(getSignalFunction)
  .put(updateSignalFunction)
  .delete(deleteSignalFunction)

module.exports = router
