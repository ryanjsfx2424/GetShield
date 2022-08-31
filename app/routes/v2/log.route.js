module.exports = (app) => {
  const log = require('../../controllers/log.controller.js')
  var router = require('express').Router()

  // Retrieve all logs
  router.get('/', log.findAll)

  app.use('/api/v2/log', router)
}
