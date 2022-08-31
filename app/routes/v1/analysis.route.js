module.exports = (app) => {
  const analysis = require('../../controllers/analysis.controller.js')
  var router = require('express').Router()
  // Create a new Analysis
  router.post('/', analysis.create)
  // Retrieve all Analysis
  router.get('/', analysis.findAll)

  app.use('/api/v1/analysis', router)
}
