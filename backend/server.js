const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// let corsOptions = {
//   origin: 'http://localhost:8081'
// }

// app.use(cors(corsOptions))

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })

app.use(cors())

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Simple route
// app.get('/', (req, res) => {
//   res.json({message: 'Welcome to the auth app'})
// })

// Route files
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

const counties = require('./app/routes/county.routes')
const subcounties = require('./app/routes/subcounty.routes')
const facilities = require('./app/routes/facility.routes')
const mentors = require('./app/routes/mentor.routes')
const mentees = require('./app/routes/mentee.routes')
const signalfunctions = require('./app/routes/signalfunction.routes')
const scores = require('./app/routes/score.routes')
const sessions = require('./app/routes/session.routes')

// Mount router
app.use('/api/v1/counties', counties)
app.use('/api/v1/subcounties', subcounties)
app.use('/api/v1/facilities', facilities)
app.use('/api/v1/mentors', mentors)
app.use('/api/v1/mentees', mentees)
app.use('/api/v1/signalfunctions', signalfunctions)
app.use('/api/v1/scores', scores)
app.use('/api/v1/sessions', sessions)

const db = require('./app/models')
const Role = db.role

// db.sequelize.sync()

db.sequelize.sync(/*{ force: true }*/).then(() => {
  console.log('Drop and Resync Db')
  // initial()
})

function initial() {
  Role.create({
    id: 1,
    name: 'user'
  })

  Role.create({
    id: 2,
    name: 'moderator'
  })

  Role.create({
    id: 3,
    name: 'admin'
  })
}

// set port to listen for requests
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
