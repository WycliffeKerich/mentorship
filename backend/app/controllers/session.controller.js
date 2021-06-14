const db = require('../models')
const Session = db.session
const SignalFunction = db.signalfunction
const Mentee = db.mentee
const Mentor = db.mentor
const Facility = db.facility
const MentorSession = db.mentorsession
const FacilitySession = db.facilitysession

// @desc      Get all sessions
// @route     GET /api/v1/sessions
// @access    Public
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      where: req.query,
      include: [
        {
          model: SignalFunction
        },
        {
          model: Mentee
        },
        {
          model: MentorSession,
          include: {
            model: Mentor
          }
        },
        {
          model: FacilitySession,
          include: {
            model: Facility
          }
        }
      ]
    })

    if (sessions.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'There are no sessions stored in the database.',
        data: {}
      })
    } else {
      res.status(200).json({
        success: true,
        count: sessions.length,
        data: sessions
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Get a single session
// @route     GET /api/v1/sessions/:id
// @access    Public
exports.getSession = async (req, res, next) => {
  try {
    const session = await Session.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: SignalFunction
        },
        {
          model: Mentee
        },
        {
          model: MentorSession,
          include: {
            model: Mentor
          }
        },
        {
          model: FacilitySession,
          include: {
            model: Facility
          }
        }
      ]
    })

    if (session.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: session
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Create a session
// @route     POST /api/v1/sessions
// @access    Private
exports.createSession = async (req, res, next) => {
  try {
    console.log(req.body)
    const sessionExists = await Session.findAll({
      where: {
        menteeId: req.body.menteeId,
        signalFunctionId: req.body.signalFunctionId
      }
    })

    if (sessionExists.length > 0) {
      res.status(400).json({
        success: false,
        message:
          'The session already exists in the database. Try editing the existing session.'
      })
    } else {
      await Session.create({
        sessionDate: req.body.sessionDate,
        menteeId: req.body.menteeId,
        signalFunctionId: req.body.signalFunctionId
      })
        .then((res) => {
          MentorSession.create({
            sessionId: res.dataValues.id,
            mentorId: req.body.mentorId
          }).catch((err) => {
            res.status(500).json({
              success: false,
              error: err
            })
          })
          FacilitySession.create({
            sessionId: res.dataValues.id,
            facilityId: req.body.facilityId
          }).catch((err) => {
            res.status(500).json({
              success: false,
              error: err
            })
          })
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            error: err
          })
        })
      res.status(201).json({
        success: true
      })
    }
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

// @desc      Update a single session
// @route     PUT /api/v1/sessions/:id
// @access    Private
exports.updateSession = async (req, res, next) => {
  const session = await Session.findAll({
    where: {
      id: req.params.id
    }
  })

  if (session.length === 0) {
    res.status(400).json({
      success: false,
      message: 'There session does not exist in the database.'
    })
  } else if (session.length > 0) {
    let mentorId = req.body.mentorId
    let facilityId = req.body.facilityId
    let sessionDate = req.body.sessionDate
    // let updatedSession
    await Session.update(
      { sessionDate },
      {
        returning: true,
        where: {
          id: req.params.id
        }
      }
    )
      .then(() => {
        if (mentorId) {
          MentorSession.update(
            { mentorId },
            {
              where: {
                sessionId: req.params.id
              }
            }
          ).catch((err) => {
            res.status(500).json({
              success: false,
              error: err
            })
          })
        }
        if (facilityId) {
          FacilitySession.update(
            { facilityId },
            {
              where: {
                sessionId: req.params.id
              }
            }
          ).catch((err) => {
            res.status(500).json({
              success: false,
              error: err
            })
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err
        })
      })

    // updatedSession = await Session.findAll({
    //   where: {
    //     id: req.params.id
    //   },
    //   include: [
    //     {
    //       model: SignalFunction
    //     },
    //     {
    //       model: Mentee
    //     },
    //     {
    //       model: FacilitySession,
    //       include: {
    //         model: Facility
    //       }
    //     },
    //     {
    //       model: MentorSession,
    //       include: {
    //         model: Mentor
    //       }
    //     }
    //   ]
    // })

    res.status(200).json({
      success: true,
      message: 'Session was updated successfully.'
      // data: updatedSession
    })
  }
}

// @desc      Delete a session
// @route     DELETE /api/v1/sessions/:id
// @access    Private
exports.deleteSession = async (req, res, next) => {
  const sessionToBeDeleted = await Session.findAll({
    where: {
      id: req.params.id
    }
  })

  if (sessionToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The session does not exist in the database.'
    })
  } else if (sessionToBeDeleted.length > 0) {
    const session = await Session.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Session was deleted successfully.'
    })
  }
}
