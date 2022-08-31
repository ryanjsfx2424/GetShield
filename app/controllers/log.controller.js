const { analyzeAddress } = require("./mythril");

const db = require("../../models");

const Log = db.Log;

const Op = db.Sequelize.Op;

// V1

// Create and Save a new Analysis
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.description && !req.body.startTime && req.body.endTime ) {
    res.status(400).send({
      message: "description, startTime and endTime fields can not be empty!",
    });
    return;
  }

  // Save log data in the database
  Log.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Analysis.",
      });
    });
};
// Retrieve all Log from the database.
exports.findAll = (req, res) => {
  const description = req.query.description;
  var condition = description
    ? { description: { [Op.iLike]: `%${description}%` } }
    : null;
  Log.findAll({ where: condition })
    .then((data) => {
      res.send(data); 
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving log.",
      });
    });
};
// Find a single Analysis with an id
exports.findOne = (req, res) => {};
// Update a Analysis by the id in the request
exports.update = (req, res) => {};

