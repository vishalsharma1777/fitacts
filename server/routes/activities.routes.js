const express = require("express");
const router = express.Router();

const { getActivities,getFavoriteActivitiesDetails} = require("../controllers/activity.controllers")

router.get('/allActivities', getActivities);
router.get('/favActivities/:id', getFavoriteActivitiesDetails);
module.exports = router;