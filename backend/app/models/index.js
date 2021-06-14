const config = require('../config/db.config.js')

const Sequelize = require('sequelize')
const { DB } = require('../config/db.config.js')
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.role = require('../models/role.model.js')(sequelize, Sequelize)

db.county = require('../models/county.model.js')(sequelize, Sequelize)
db.subcounty = require('../models/subcounty.model.js')(sequelize, Sequelize)
db.facility = require('../models/facility.model.js')(sequelize, Sequelize)
db.mentor = require('../models/mentor.model.js')(sequelize, Sequelize)
db.mentee = require('../models/mentee.model.js')(sequelize, Sequelize)
db.signalfunction = require('../models/signalfunction.model.js')(
  sequelize,
  Sequelize
)
db.score = require('../models/score.model.js')(sequelize, Sequelize)
db.session = require('../models/session.model.js')(sequelize, Sequelize)
db.mentorsession = require('../models/mentorsession.model.js')(
  sequelize,
  Sequelize
)
db.facilitysession = require('../models/facilitysession.model.js')(
  sequelize,
  Sequelize
)

// Mentor - signalFunction relationship [ SUPER MANY TO MANY RELATIONSHIP]
db.mentee.belongsToMany(db.signalfunction, {
  through: db.score
  // foreignKey: 'menteeId',
  // as: 'signalfunction'
})
db.signalfunction.belongsToMany(db.mentee, {
  through: db.score
  // foreignKey: 'signalFunctionId',
  // as: 'mentee'
})
db.mentee.hasMany(db.score)
db.score.belongsTo(db.mentee)
db.signalfunction.hasMany(db.score)
db.score.belongsTo(db.signalfunction)

// mentee - signalFunction {{SESSION}} relationship [ SUPER MANY TO MANY RELATIONSHIP]

db.mentee.belongsToMany(db.signalfunction, { through: db.session })
db.signalfunction.belongsToMany(db.mentee, { through: db.session })
db.session.belongsTo(db.mentee)
db.session.belongsTo(db.signalfunction)
db.mentee.hasMany(db.session)
db.signalfunction.hasMany(db.session)

// session - mentor relationship {{MENTOR_SESSION}} [super-many-to-many relationship]

db.mentor.belongsToMany(db.session, { through: db.mentorsession })
db.session.belongsToMany(db.mentor, { through: db.mentorsession })
db.mentorsession.belongsTo(db.mentor)
db.mentorsession.belongsTo(db.session)
db.mentor.hasMany(db.mentorsession)
db.session.hasMany(db.mentorsession, { onDelete: 'cascade', hooks: true })

// session - facility relationship {{FACILITY_SESSION}} [super-many-to-many relationship]

db.facility.belongsToMany(db.session, { through: db.facilitysession })
db.session.belongsToMany(db.facility, { through: db.facilitysession })
db.facilitysession.belongsTo(db.facility)
db.facilitysession.belongsTo(db.session)
db.facility.hasMany(db.facilitysession)
db.session.hasMany(db.facilitysession, { onDelete: 'cascade', hooks: true })

// ------ START ----- //

// db.mentee.belongsToMany(db.mentor, {
//   through: db.session
// })
// db.mentee.belongsToMany(db.signalfunction, {
//   through: db.session
// })
// db.mentee.belongsToMany(db.facility, {
//   through: db.session
// })

// db.mentor.belongsToMany(db.mentee, {
//   through: db.session
// })
// db.mentor.belongsToMany(db.facility, {
//   through: db.session
// })
// db.mentor.belongsToMany(db.signalfunction, {
//   through: db.session
// })

// db.signalfunction.belongsToMany(db.mentor, {
//   through: db.session
// })
// db.signalfunction.belongsToMany(db.mentee, {
//   through: db.session
// })
// db.signalfunction.belongsToMany(db.facility, {
//   through: db.session
// })

// db.facility.belongsToMany(db.mentee, {
//   through: db.session
// })
// db.facility.belongsToMany(db.mentor, {
//   through: db.session
// })
// db.facility.belongsToMany(db.signalfunction, {
//   through: db.session
// })

// db.mentee.hasMany(db.session)
// db.session.belongsTo(db.mentee)
// db.mentor.hasMany(db.session)
// db.session.belongsTo(db.mentor)
// db.signalfunction.hasMany(db.session)
// db.session.belongsTo(db.signalfunction)
// // Addedd
// db.facility.hasMany(db.session)
// db.session.belongsTo(db.facility)

// ------ End -------- //

// County - subcounty relationship
db.county.hasMany(db.subcounty, { as: 'subcounties' })
db.subcounty.belongsTo(db.county, {
  foreignKey: 'countyId',
  as: 'county'
})

// subcounty - facility relationship
db.subcounty.hasMany(db.facility, { as: 'facilities' })
db.facility.belongsTo(db.subcounty, {
  foreignKey: 'subcountyId',
  as: 'subcounty'
})

// facility - mentor relationship
db.facility.hasMany(
  db.mentor
  // { as: 'mentors' }
)
db.mentor.belongsTo(db.facility, {
  foreignKey: 'facilityId',
  as: 'primaryFacility'
})

// facility(mentorship) - mentee relationship
db.facility.hasMany(db.mentee, { as: 'menteesMentorshipFacility' })
db.mentee.belongsTo(db.facility, {
  foreignKey: 'mentorshipFacilityId',
  as: 'mentorshipFacility'
})

// facility(primary) - mentee relationship
db.facility.hasMany(db.mentee, { as: 'menteesPrimaryFacility' })
db.mentee.belongsTo(db.facility, {
  foreignKey: 'primaryFacilityId',
  as: 'primaryFacility'
})

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
})

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
})

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
