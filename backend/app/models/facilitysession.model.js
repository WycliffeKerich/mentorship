module.exports = (sequelize, Sequelize) => {
  const FacilitySession = sequelize.define('facilitysessions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  })

  return FacilitySession
}
