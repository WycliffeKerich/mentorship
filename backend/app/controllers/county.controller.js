const { subcounty } = require('../models')
const db = require('../models')
const County = db.county

// @desc      Get all counties
// @route     GET /api/v1/counties
// @access    Public
exports.getCounties = async (req, res, next) => {
  try {
    const counties = await County.findAll({
      include: ['subcounties']
    })

    if (counties.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'There are no records of counties stored in the database.'
      })
    }

    res.status(200).json({
      success: true,
      count: counties.length,
      data: counties
    })
  } catch (error) {
    res.status(400).json({
      success: false
    })
  }
}

// @desc      Get a single county
// @route     GET /api/v1/counties/:id
// @access    Public
exports.getCounty = async (req, res, next) => {
  try {
    const county = await County.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: subcounty,
          as: 'subcounties'
        }
      ]
    })

    if (county.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: county
    })
  } catch (error) {
    res.status(400).json({
      success: false
    })
  }
}

// @desc      Create a county
// @route     POST /api/v1/counties
// @access    Private
exports.createCounty = async (req, res, next) => {
  try {
    const county = await County.create(req.body)
    res.status(201).json({
      success: true,
      data: county.dataValues
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

// @desc      Update a single county
// @route     PUT /api/v1/counties/:id
// @access    Private
exports.updateCounty = async (req, res, next) => {
  const countyToBeUpdated = await County.findAll({
    where: {
      id: req.params.id
    }
  })

  console.log(countyToBeUpdated)

  if (countyToBeUpdated.length === 0) {
    res.status(400).json({
      success: false,
      message: 'There county does not exist in the database.'
    })
  } else if (countyToBeUpdated.length > 0) {
    const county = await County.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    const updatedCounty = await County.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: subcounty,
          as: 'subcounties'
        }
      ]
    })

    res.status(200).json({
      success: true,
      message: 'County was updated successfully.',
      data: updatedCounty
    })
  }
}

// @desc      Delete a county
// @route     DELETE /api/v1/counties/:id
// @access    Private
exports.deleteCounty = async (req, res, next) => {
  const countyToBeDeleted = await County.findAll({
    where: {
      id: req.params.id
    }
  })

  if (countyToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'There county does not exist in the database.'
    })
  } else if (countyToBeDeleted.length > 0) {
    const county = await County.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'County was deleted successfully.'
    })
  }

  // try {
  //   await County.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })

  //   res.status(200).json({
  //     success: true,
  //     data: {
  //       message: 'County successfully deleted'
  //     }
  //   })
  // } catch (error) {
  //   res.status(400).json({
  //     success: false
  //   })
  // }
}
