const express = require("express");
const router = express.Router();

const {createperformance,getUserPerformance,deletePerformance,updateTimeline} = require('../controllers/performance.controllers');

router.post('/createperformance',createperformance);
router.get('/userperformance/:id/:activityId',getUserPerformance)
router.delete('/deleteperformance/:id/:activityId/:performanceId',deletePerformance)
router.put('/updatetimeline/:id/:performanceId',updateTimeline)


module.exports = router;
