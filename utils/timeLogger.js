const db = require("../models");

const Log = db.Log;

const timeLogger = async (type, description, startTime, endTime, timeElapses) => {
  try {
    // Validate
    if (!type && !description && !startTime && endTime && !timeElapse) return;

    return await Log.create({type, description, startTime, endTime, timeElapses });
  } catch (err) {
    return null;
  }
};

module.exports = timeLogger;
