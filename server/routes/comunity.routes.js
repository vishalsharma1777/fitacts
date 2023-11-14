const express = require("express");
const router = express.Router();

const {getUsersWithAllDetails,getUsersFollowing} = require('../controllers/comunity.controllers');

router.get('/usersWithAllDetails',getUsersWithAllDetails)
router.get('/usersFollowing/:id',getUsersFollowing)


module.exports = router;