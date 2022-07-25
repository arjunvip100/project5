const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

// Authentication.
const authentication = async function (req, res, next) {
  try {
    console.log("Authentication.");
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//Authorization.
const authorization = async function (req, res, next) {
  try {
    console.log("Authorization.");
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { authentication, authorization };
