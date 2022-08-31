const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5959
const db = require('./models')

// implement cors
app.use(cors())
app.options('*', cors())

app.use(express.json())

// DB connections
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

// Routes
app.use(express.static('build'))
app.get('*', (req, res) => {
  res.sendfile(__dirname, 'build', 'index.html')
})

require('./app/routes/v1/analysis.route')(app)
require('./app/routes/v1/log.route')(app)
require('./app/routes/v2/analysis.route')(app)
require('./app/routes/v2/log.route')(app)
require('./app/routes/v3/analysis.route')(app)

// POTENTIAL ADDITION ISSUE:
// require('./app/routes/auth.route')(app)
// require('./app/routes/plan.route')(app)
// require('./app/routes/subscription.route')(app)
// require('./app/routes/payment.route')(app)

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})
