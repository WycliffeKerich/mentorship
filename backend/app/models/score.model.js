module.exports = (sequelize, Sequelize) => {
  const Score = sequelize.define('scores', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    baseline: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3', '4', '5']
    },
    midline: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3', '4', '5']
    },
    endline: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3', '4', '5']
    }
  })

  return Score
}
