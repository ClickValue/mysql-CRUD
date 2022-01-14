const express = require("express");
const db = require("../database/queries");
const authenticate = require("./middleware/authenticate");
const errorHandler = require("./middleware/errorHandler");
const router = express.Router();

router.use(authenticate);
router.use(errorHandler);

//Default methode om data in database te updaten
router.route("/updateDatabase").post(async (req, res) => {
  const data = req.body;
  const userId = req.query.userId;
  let result;
  if (userId === 0) {
    result = {
      error: "Invalid user ID",
      status: 422,
    };
    res.status(422).send(result);
    return;
  }
  result = await db.postUpdateDatabase(data);
  res.send(result);
});

//Default methode om data in de database te inserten
router.route("/insertDatabase").post(async (req, res) => {
  const data = req.body;
  const userId = req.query.userId;
  let result;
  if (userId === 0) {
    result = {
      error: "Invalid user ID",
      status: 422,
    };
    res.status(422).send(result);
    return;
  }
  result = await db.postInsertDatabase(data);
  res.send(result);
});
//Default get om data uit de database te halen
router.get("/fromDatabase", async (req, res) => {
  const table = req.query.tableName;
  const where = req.query.where || "";
  const result = await db.getFromDatabase(table, where);
  res.send(result);
});

//Default delete om data uit de database te verwijderen
router.route("/deleteFromDatabase").post(async (req, res) => {
  const data = req.body;
  const userId = req.query.userId;
  let result;
  if (userId === 0) {
    result = {
      error: "Invalid user ID",
      status: 422,
    };
    res.status(422).send(result);
    return;
  }
  result = await db.deleteFromDatabase(data);
  res.send(result);
});

module.exports = router;
