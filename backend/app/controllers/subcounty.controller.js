const { subcounty } = require('../models')
const db = require('../models')
const County = db.county
const SubCounty = db.subcounty

// @desc      Get all counties
// @route     GET /api/v1/subcounties
// @access    Public
exports.getSubCounties = async (req, res, next) => {
  try {
    const subCounties = await SubCounty.findAll({
      include: ['county']
    })

    if (subCounties.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'There are no subcounties stored in the database.'
      })
    }

    res.status(200).json({
      success: true,
      count: subCounties.length,
      data: subCounties
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Get a single county
// @route     GET /api/v1/subcounties/:id
// @access    Public
exports.getSubCounty = async (req, res, next) => {
  try {
    const subCounty = await SubCounty.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: County,
          as: 'county'
        }
      ]
    })

    if (subCounty.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: subCounty
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Create a county
// @route     POST /api/v1/subcounties
// @access    Private
exports.createSubCounty = async (req, res, next) => {
  try {
    const subCounty = await SubCounty.create(req.body)
    res.status(201).json({
      success: true,
      data: subCounty.dataValues
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
// @route     PUT /api/v1/subcounties/:id
// @access    Private
exports.updateSubCounty = async (req, res, next) => {
  const subCountyToBeUpdated = await SubCounty.findAll({
    where: {
      id: req.params.id
    }
  })

  if (subCountyToBeUpdated.length === 0) {
    res.status(400).json({
      success: false,
      message: 'There subcounty does not exist in the database.'
    })
  } else if (subCountyToBeUpdated.length > 0) {
    const county = await SubCounty.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    const updatedSubCounty = await SubCounty.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: County,
          as: 'county'
        }
      ]
    })

    res.status(200).json({
      success: true,
      message: 'Subcounty was updated successfully.',
      data: updatedSubCounty
    })
  }
}

// @desc      Delete a county
// @route     DELETE /api/v1/subcounties/:id
// @access    Private
exports.deleteSubCounty = async (req, res, next) => {
  const subCountyToBeDeleted = await SubCounty.findAll({
    where: {
      id: req.params.id
    }
  })

  if (subCountyToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The subcounty does not exist in the database.'
    })
  } else if (subCountyToBeDeleted.length > 0) {
    const subCounty = await SubCounty.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Subcounty was deleted successfully.'
    })
  }
}
