const perfy = require("perfy");

const { analyzeAddress } = require("./mythril");
// use the enter.new.analysis.type to create the new analysis form
// const { analyzeAddress_new } = require('./enter.new.analysis.type')

const db = require("../../models");
const { ERC721Validate } = require("../controllers/erc721Validator");
const timeLogger = require("../../utils/timeLogger");
const { transactionCount } = require("./transactionCount");
const { detectFunction } = require("./detectFunction");
const Analysis = db.Analysis;

const Op = db.Sequelize.Op;

// V1

// Create and Save a new Analysis
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.address) {
    res.status(400).send({
      message: "contract address can not be empty!",
    });
    return;
  }

  const addresses =
    Array.isArray(req.body.address) && req.body.address.length > 0
      ? req.body.address.join(",")
      : req.body.address;

  perfy.start("logger-analysis");

  const data = await analyzeAddress(req.body.address);

  const timer = perfy.end("logger-analysis");

  timeLogger(
    "Batch",
    `Time took to analyze the following contracts: ${addresses}`,
    timer.startTime,
    timer.endTime,
    `${timer.time}s`
  );

  // Save Analysis in the database
  Analysis.bulkCreate(data, { ignoreDuplicates: true })
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
// Retrieve all Analysis from the database.
exports.findAll = (req, res) => {
  const contract_address = req.query.contract_address;
  var condition = contract_address
    ? { contract_address: { [Op.iLike]: `%${contract_address}%` } }
    : null;
  Analysis.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving analysis.",
      });
    });
};
// Find a single Analysis with an id
exports.findOne = (req, res) => {};
// Update a Analysis by the id in the request
exports.update = (req, res) => {};

// V2

// Create and Save a new Analysis
exports.v2create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.address) {
      res.status(400).send({
        message: "contract address can not be empty!",
      });
      return;
    }
    const addresses =
      Array.isArray(req.body.address) && req.body.address.length > 0
        ? req.body.address.join(",")
        : req.body.address;

    perfy.start("logger-analysis-v2");

    const resp = await ERC721Validate(req.body.address);

    const timer = perfy.end("logger-analysis-v2");

    timeLogger(
      "Batch",
      `Time took to analyze the following contracts: ${addresses}`,
      timer.startTime,
      timer.endTime,
      `${timer.time}s`
    );

    res.send(resp);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Analysis.",
    });
  }
};

exports.getTransactionCount = async (req, res) => {
  try {
    // Validate request
    if (!req.body.address) {
      res.status(400).send({
        message: "contract address can not be empty!",
      });
      return;
    }
    const resp = await transactionCount(req.body.address);
    res.send(resp);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Analysis.",
    });
  }
};


// v3

exports.v3create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.address) {
      res.status(400).send({
        message: "contract address can not be empty!",
      });
      return;
    }
    const addresses =
      Array.isArray(req.body.address) && req.body.address.length > 0
        ? req.body.address.join(",")
        : req.body.address;

    // perfy.start("logger-analysis-v2");

    const resp = await detectFunction(req.body.address);

    // const timer = perfy.end("logger-analysis-v2");

    // timeLogger(
    //   "Batch",
    //   `Time took to analyze the following contracts: ${addresses}`,
    //   timer.startTime,
    //   timer.endTime,
    //   `${timer.time}s`
    // );

    res.send(resp);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Analysis.",
    });
  }
};
