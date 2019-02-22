const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PersonInformation = require("../schemas/personalInfo");

router.post("/", (req, res, next) => {
  console.log(req.body, "check this");

  const piddata = new PersonInformation({
    pIData: req.body
  });
  piddata
    .save()
    .then(result => {
      console.log(result.pIData);
      /* res.status(200).json({
        success: true,
        savedPIData: result.pIData
      }); */
      var mySavedObject = {
        savedStatus: 200,
        savedPIData: result.pIData
      };
      res.send(mySavedObject);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
