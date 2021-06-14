const { subcounty } = require('../models')
const db = require('../models')
const County = db.county
const SignalFunction = db.signalfunction

// @desc      Get all signalfunctions
// @route     GET /api/v1/signalfunctions
// @access    Public
exports.getSignalFunctions = async (req, res, next) => {
  try {
    const signalFunctions = await SignalFunction.findAll({
      // include: ['subcounties']
    })

    if (signalFunctions.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          'There are no records of signal functions stored in the database.'
      })
    }

    res.status(200).json({
      success: true,
      count: signalFunctions.length,
      data: signalFunctions
    })
  } catch (error) {
    res.status(400).json({
      success: false
    })
  }
}

// @desc      Get a single signal function
// @route     GET /api/v1/signalfunctions/:id
// @access    Public
exports.getSignalFunction = async (req, res, next) => {
  try {
    const signalFunction = await SignalFunction.findAll({
      where: {
        id: req.params.id
      }
      // include: [
      //   {
      //     model: subcounty,
      //     as: 'subcounties'
      //   }
      // ]
    })

    if (signalFunction.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: signalFunction
    })
  } catch (error) {
    res.status(400).json({
      success: false
    })
  }
}

// @desc      Create a signal function
// @route     POST /api/v1/signalfunctions
// @access    Private
exports.createSignalFunction = async (req, res, next) => {
  try {
    const signalFunction = await SignalFunction.create(req.body)
    res.status(201).json({
      success: true,
      data: signalFunction.dataValues
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        name: error.name,
        description: error.parent['sqlMessage']
      }
    })
  }
}

// @desc      Update a single signal function
// @route     PUT /api/v1/signalfunctions/:id
// @access    Private
exports.updateSignalFunction = async (req, res, next) => {
  const signalFunctionToBeUpdated = await SignalFunction.findAll({
    where: {
      id: req.params.id
    }
  })

  if (signalFunctionToBeUpdated.length === 0) {
    res.status(400).json({
      success: false,
      message: 'There signal function does not exist in the database.'
    })
  } else if (signalFunctionToBeUpdated.length > 0) {
    const signalFunction = await SignalFunction.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    const updatedSignalFunction = await SignalFunction.findAll({
      where: {
        id: req.params.id
      }
      // include: [
      //   {
      //     model: subcounty,
      //     as: 'subcounties'
      //   }
      // ]
    })

    res.status(200).json({
      success: true,
      message: 'Signal function was updated successfully.',
      data: updatedSignalFunction
    })
  }
}

// @desc      Delete a signal function
// @route     DELETE /api/v1/signalfunctions/:id
// @access    Private
exports.deleteSignalFunction = async (req, res, next) => {
  const signalFunctionToBeDeleted = await SignalFunction.findAll({
    where: {
      id: req.params.id
    }
  })

  if (signalFunctionToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'There signal function does not exist in the database.'
    })
  } else if (signalFunctionToBeDeleted.length > 0) {
    const signalFunction = await SignalFunction.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Signal function was deleted successfully.'
    })
  }
}
