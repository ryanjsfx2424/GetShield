module.exports = (app) => {
  const analysis = require('../../controllers/analysis.controller.js')
  var router = require('express').Router()
  // Create a new Analysis
  router.post('/', analysis.v3create)

  // Retrieve all Analysis
  router.get('/', analysis.findAll)

  app.use('/api/v3/analysis/opensea', router)
}
