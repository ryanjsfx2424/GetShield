module.exports = (app) => {
  const analysis = require('../../controllers/analysis.controller.js')
  var router = require('express').Router()
  // Create a new Analysis
  router.post('/', analysis.v2create)
  
  router.post('/count', analysis.getTransactionCount)
  // Retrieve all Analysis
  router.get('/', analysis.findAll)

  app.use('/api/v2/analysis', router)
}
