module.exports = (sequelize, Sequelize) => {
  const County = sequelize.define('counties', {
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    countyCode: {
      type: Sequelize.STRING,
      unique: true
    }
  })

  return County
}
