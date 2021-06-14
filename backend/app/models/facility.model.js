module.exports = (sequelize, Sequelize) => {
  const Facility = sequelize.define('facilities', {
    name: {
      type: Sequelize.STRING
    },
    facilityCode: {
      type: Sequelize.STRING
    },
    facilityOwnership: {
      type: Sequelize.ENUM,
      values: ['MOH', 'FBO', 'Private']
    },
    facilityLevel: {
      type: Sequelize.ENUM,
      values: ['Dispensary', 'Health Center', 'Hospital']
    }
  })

  return Facility
}
