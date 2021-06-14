module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define('sessions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sessionDate: {
      type: Sequelize.DATEONLY,
      default: Sequelize.NOW
    }
  })

  return Session
}
