const express = require("express");
const router = express.Router();

const {createperformance,getUserPerformance} = require('../controllers/performance.controllers');

router.post('/createperformance',createperformance);
router.get('/userperformance/:id/:activityId',getUserPerformance)


module.exports = router;
