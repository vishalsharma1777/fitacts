const express = require("express");
const router = express.Router();

const { createUser, getUsers, loginUser, updateFavActivity, getUserFavActivites } = require("../controllers/users.controllers");

router.get('/allUsers', getUsers);
router.post('/createUser', createUser);
router.post('/loginUser', loginUser)
router.put('/updateFavActivity', updateFavActivity)
router.get('/getUserFavActivites/:id', getUserFavActivites)




module.exports = router;