module.exports = (sequelize, Sequelize) => {
  const Mentor = sequelize.define('mentors', {
    name: {
      type: Sequelize.STRING
    },
    mentorCode: {
      type: Sequelize.STRING,
      unique: true
    }
  })

  return Mentor
}
