const { facility } = require('../models')
const db = require('../models')
const Facility = db.facility
const County = db.county
const SubCounty = db.subcounty
const Mentor = db.mentor

// @desc      Get all mentors
// @route     GET /api/v1/mentors
// @access    Public
exports.getMentors = async (req, res, next) => {
  try {
    const mentors = await Mentor.findAll({
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
        }
      ]
    })

    if (mentors.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'There are no facilities stored in the database.'
      })
    }

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Get a single mentor
// @route     GET /api/v1/mentors/:id
// @access    Public
exports.getMentor = async (req, res, next) => {
  try {
    const mentor = await Mentor.findAll({
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
        }
      ]
    })

    if (mentor.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: mentor
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Create a mentor
// @route     POST /api/v1/mentors
// @access    Private
exports.createMentor = async (req, res, next) => {
  try {
    const mentor = await Mentor.create(req.body)
    res.status(201).json({
      success: true,
      data: mentor.dataValues
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

// @desc      Update a single mentor
// @route     PUT /api/v1/mentors/:id
// @access    Private
exports.updateMentor = async (req, res, next) => {
  const mentorToBeUpdated = await Mentor.findAll({
    where: {
      id: req.params.id
    }
  })

  if (mentorToBeUpdated.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The mentor does not exist in the database.'
    })
  } else if (mentorToBeUpdated.length > 0) {
    console.log('Updating mentor')
    const mentor = await Mentor.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    const updatedMentor = await Mentor.findAll({
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
        }
      ]
    })

    res.status(200).json({
      success: true,
      message: 'Mentor was updated successfully.',
      data: updatedMentor
    })
  }
}

// @desc      Delete a mentor
// @route     DELETE /api/v1/mentors/:id
// @access    Private
exports.deleteMentor = async (req, res, next) => {
  const mentorToBeDeleted = await Mentor.findAll({
    where: {
      id: req.params.id
    }
  })

  if (mentorToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The mentor does not exist in the database.'
    })
  } else if (mentorToBeDeleted.length > 0) {
    const mentor = await Mentor.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Mentor was deleted successfully.'
    })
  }
}
