const express = require("express");
const router = express.Router();

const { getUsersWithAllDetails, addOrRemoveFollowing, getUsersFollowing } = require('../controllers/community.controllers');

router.get('/usersWithAllDetails', getUsersWithAllDetails)
router.get('/usersFollowing/:id', getUsersFollowing)
router.put('/addOrRemoveFollowing/:id', addOrRemoveFollowing)


module.exports = router;