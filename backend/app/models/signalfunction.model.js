module.exports = (sequelize, Sequelize) => {
  const SignalFunction = sequelize.define('signalFunctions', {
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    signalFunctionCode: {
      type: Sequelize.STRING,
      unique: true
    },
    signalFunctionDescription: {
      type: Sequelize.STRING
    }
  })

  return SignalFunction
}
