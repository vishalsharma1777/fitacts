const express = require("express");
const router = express.Router();

const { getActivities} = require("../controllers/activity.controllers")

router.get('/allActivities', getActivities);
module.exports = router;