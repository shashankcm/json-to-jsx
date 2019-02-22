const mongoose = require("mongoose");

const personalInfoSchema = mongoose.Schema({
  pIData: Object
});

module.exports = mongoose.model("PersonInformation", personalInfoSchema);
