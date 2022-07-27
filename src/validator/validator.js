const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  if (typeof value === "number" && value.toString().trim().length === 0) return false
  return true;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);
};
let isValidPrice = (/^\d{0,8}(\.\d{1,4})?$/)

let isValidEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

let isValidPhone = (/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/);

let pincodeValid = (/(^[0-9]{6}(?:\s*,\s*[0-9]{6})*$)/)

let isValidEnum = (enm) =>{
  var uniqueEnums = [...new Set(enm)];
  const enumList = ["S", "XS", "M", "X", "L", "XXL", "XL"];
  return enm.length === uniqueEnums.length && enm.every(e => enumList.includes(e));
}

module.exports = {
  isValid,
  isValidObjectId,
  isValidRequestBody, isValidPrice, isValidEmail, isValidPhone, pincodeValid, isValidEnum
};
