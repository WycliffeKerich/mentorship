module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'crappy@*11',
  DB: 'mentorship_db',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
