const db = require('../models')
const Score = db.score
const SignalFunction = db.signalfunction
const Mentee = db.mentee

// @desc      Get all scores
// @route     GET /api/v1/scores
// @access    Public
exports.getScores = async (req, res, next) => {
  try {
    const scores = await Score.findAll({
      where: req.query,
      include: [
        {
          model: SignalFunction
        },
        {
          model: Mentee
        }
      ]
    })

    if (scores.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'There are no scores stored in the database.',
        data: {}
      })
    } else {
      res.status(200).json({
        success: true,
        count: scores.length,
        data: scores
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Get a single score
// @route     GET /api/v1/scores/:id
// @access    Public
exports.getScore = async (req, res, next) => {
  try {
    const score = await Score.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: SignalFunction
        },
        {
          model: Mentee
        }
      ]
    })

    if (score.length === 0) {
      return res.status(400).json({
        success: false
      })
    }

    res.status(200).json({
      success: true,
      data: score
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    })
  }
}

// @desc      Create a score
// @route     POST /api/v1/scores
// @access    Private
exports.createScore = async (req, res, next) => {
  try {
    console.log(req.body)
    const scoreExists = await Score.findAll({
      where: {
        menteeId: req.body.menteeId,
        signalFunctionId: req.body.signalFunctionId
      }
    })

    if (scoreExists.length > 0) {
      res.status(400).json({
        success: false,
        message:
          'The score already exists in the database. Try editing the existing score.'
      })
    } else {
      const score = await Score.create(req.body)
      res.status(201).json({
        success: true,
        data: score.dataValues
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

// @desc      Update a single score
// @route     PUT /api/v1/scores/:id
// @access    Private
exports.updateScore = async (req, res, next) => {
  const score = await Score.findAll({
    where: {
      id: req.params.id
    }
  })

  if (score.length === 0) {
    res.status(400).json({
      success: false,
      message: 'There score does not exist in the database.'
    })
  } else if (score.length > 0) {
    const score = await Score.update(req.body, {
      returning: true,
      where: {
        id: req.params.id
      }
    })

    const updatedScore = await Score.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: SignalFunction
        },
        {
          model: Mentee
        }
      ]
    })

    res.status(200).json({
      success: true,
      message: 'Score was updated successfully.',
      data: updatedScore
    })
  }
}

// @desc      Delete a score
// @route     DELETE /api/v1/scores/:id
// @access    Private
exports.deleteScore = async (req, res, next) => {
  const scoreToBeDeleted = await Score.findAll({
    where: {
      id: req.params.id
    }
  })

  if (scoreToBeDeleted.length === 0) {
    res.status(400).json({
      success: false,
      message: 'The score does not exist in the database.'
    })
  } else if (scoreToBeDeleted.length > 0) {
    const score = await Score.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json({
      success: true,
      message: 'Score was deleted successfully.'
    })
  }
}
