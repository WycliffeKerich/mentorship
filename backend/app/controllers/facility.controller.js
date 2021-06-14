const { subcounty } = require('../models')
const db = require('../models')
const County = db.county
const SubCounty = db.subcounty
const Facility = db.facility

// @desc      Get all facilities
// @route     GET /api/v1/facilities
// @access    Public
exports.getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.findAll({
      include: [
        {
          model: SubCounty,
          as: 'subcounty',
          include: [
            {
              model: County,
              as: 'county'
            }
          ]
        }
      ]
    })

    if (facilities.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'There are no facilities stored in the database.'
      })
    }

    res.status(200).json({
      success: true,
      count: facilities.length,
      data: facilities
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
exports.getFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: SubCounty,
          as: 'subcounty',
          include: [
            {
              model: County,
              as: 'county'
            }
          ]
        }
      ]
    })

    if (facility.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: facility
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
exports.createFacility = async (req, res, next) => {
  try {
    const facility = await Facility.create(req.body)
    res.status(201).json({
      success: true,
      data: facility.dataValues
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
exports.updateFacility = async (req, res, next) => {
  const facilityToBeUpdated = await Facility.findAll({
    where: {
      id: req.params.id
    }
  })

  if (facilityToBeUpdated.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The facility does not exist in the database.'
    })
  } else if (facilityToBeUpdated.length > 0) {
    const county = await Facility.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    const updatedFacility = await Facility.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: SubCounty,
          as: 'subcounty',
          include: [
            {
              model: County,
              as: 'county'
            }
          ]
        }
      ]
    })

    res.status(200).json({
      success: true,
      message: 'Subcounty was updated successfully.',
      data: updatedFacility
    })
  }
}

// @desc      Delete a county
// @route     DELETE /api/v1/subcounties/:id
// @access    Private
exports.deleteFacility = async (req, res, next) => {
  const facilityToBeDeleted = await Facility.findAll({
    where: {
      id: req.params.id
    }
  })

  if (facilityToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The facility does not exist in the database.'
    })
  } else if (facilityToBeDeleted.length > 0) {
    const facility = await Facility.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Facility was deleted successfully.'
    })
  }
}
