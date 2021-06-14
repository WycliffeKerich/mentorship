const db = require('../models')
const Facility = db.facility
const County = db.county
const SubCounty = db.subcounty
const Mentee = db.mentee

// @desc      Get all mentees
// @route     GET /api/v1/mentees
// @access    Public
exports.getMentees = async (req, res, next) => {
  try {
    const mentees = await Mentee.findAll({
      include: [
        {
          model: Facility,
          as: 'primaryFacility',
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
        },
        {
          model: Facility,
          as: 'mentorshipFacility',
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
        }
      ]
    })

    if (mentees.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'There are no mentees stored in the database.'
      })
    }

    res.status(200).json({
      success: true,
      count: mentees.length,
      data: mentees
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Get a single mentee
// @route     GET /api/v1/mentees/:id
// @access    Public
exports.getMentee = async (req, res, next) => {
  try {
    const mentee = await Mentee.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Facility,
          as: 'mentorshipFacility',
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
        },
        {
          model: Facility,
          as: 'primaryFacility',
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
        }
      ]
    })

    if (mentee.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: mentee
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Create a mentee
// @route     POST /api/v1/mentees
// @access    Private
exports.createMentee = async (req, res, next) => {
  try {
    const mentee = await Mentee.create(req.body)
    res.status(201).json({
      success: true,
      data: mentee.dataValues
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

// @desc      Update a single mentee
// @route     PUT /api/v1/mentees/:id
// @access    Private
exports.updateMentee = async (req, res, next) => {
  const menteeToBeUpdated = await Mentee.findAll({
    where: {
      id: req.params.id
    }
  })

  if (menteeToBeUpdated.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The mentee does not exist in the database.'
    })
  } else if (menteeToBeUpdated.length > 0) {
    const mentee = await Mentee.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    const updatedMentee = await Mentee.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Facility,
          as: 'primaryFacility',
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
        },
        {
          model: Facility,
          as: 'mentorshipFacility',
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
        }
      ]
    })

    res.status(200).json({
      success: true,
      message: 'Mentee was updated successfully.',
      data: updatedMentee
    })
  }
}

// @desc      Delete a mentee
// @route     DELETE /api/v1/mentees/:id
// @access    Private
exports.deleteMentee = async (req, res, next) => {
  const menteeToBeDeleted = await Mentee.findAll({
    where: {
      id: req.params.id
    }
  })

  if (menteeToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The mentee does not exist in the database.'
    })
  } else if (menteeToBeDeleted.length > 0) {
    const mentee = await Mentee.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Mentee was deleted successfully.'
    })
  }
}
