const express = require("express");
const router = express.Router();

const {createperformance,getUserPerformance,userperformance,getUserTop5Performances,deletePerformance,updateTimeline} = require('../controllers/performance.controllers');

router.post('/createperformance',createperformance);
router.get('/userperformance/:id/:activityId',getUserPerformance)
router.delete('/deleteperformance/:id/:activityId/:performanceId',deletePerformance)
router.put('/updatetimeline/:id/:performanceId',updateTimeline)
router.get('/userTop5Performances/:id/:activityId',getUserTop5Performances)
router.get('/userperformance/:id',userperformance)


module.exports = router;
