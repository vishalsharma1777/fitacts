const express = require("express");
const router = express.Router();

const { createUser,getUsers,loginUser } = require("../controllers/users.controllers");

router.get('/allUsers', getUsers);
router.post('/createUser', createUser);
router.post('/loginUser',loginUser)




module.exports = router;