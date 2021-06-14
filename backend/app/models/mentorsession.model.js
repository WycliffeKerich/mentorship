module.exports = (sequelize, Sequelize) => {
  const MentorSession = sequelize.define('mentorsessions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  })

  return MentorSession
}
