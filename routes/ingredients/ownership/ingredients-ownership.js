const express = require("express");
const router = express.Router();
require("dotenv").config();

const { MongoClient, ObjectID } = require("mongodb");
const url = process.env.MONGODB_URL;

//28.2 change ingredient's ownership
router.put("/:ingredients_id/:user", async function (req, res, next) {
  try {
    const dbo = await MongoClient.connect(url);
    const uid = new ObjectID(req.params.ingredients_id);
    const result = await dbo
      .db("neufood")
      .collection("ingredients")
      .findOneAndUpdate({ _id: uid }, { $set: { user: req.params.user } });
    if (result.value === null) return res.status(400).send("No record found.");
    res.send("successful updated");
    dbo.close();
  } catch (err) {
    console.error(err);
    return res.status(400).send(err);
  }
});

module.exports = router;
