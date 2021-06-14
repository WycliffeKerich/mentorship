module.exports = (sequelize, Sequelize) => {
  const SubCounty = sequelize.define('subcounties', {
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    subCountyCode: {
      type: Sequelize.STRING
    }
  })

  return SubCounty
}
