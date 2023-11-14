const express = require("express");
const router = express.Router();

const {getUsersWithAllDetails,addOrRemoveFollowing,getUsersFollowing} = require('../controllers/comunity.controllers');

router.get('/usersWithAllDetails',getUsersWithAllDetails)
router.get('/usersFollowing/:id',getUsersFollowing)
router.put('/addOrRemoveFollowing/:id',addOrRemoveFollowing)


module.exports = router;