module.exports = (sequelize, Sequelize) => {
  const Mentee = sequelize.define('mentees', {
    menteeCode: {
      type: Sequelize.STRING,
      unique: true
    }
  })

  return Mentee
}
