const express = require("express");
const router = express.Router();


const { createUser,userTimeline,getFollowerTimeline,getUserAdhar,uploadAadhar, getUsers,getUserById,getUserTimeline, loginUser, updateFavActivity, getUserFavActivites } = require("../controllers/users.controllers");



router.get('/allUsers', getUsers); 
router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.put('/updateFavActivity', updateFavActivity)
router.get('/getUserFavActivites/:id', getUserFavActivites)
router.get('/getUserTimeline/:id', getUserTimeline) 
router.get('/userTimeline/:id', userTimeline)
router.get('/getUserById/:id', getUserById)
router.get('/getUserAdhar/:id', getUserAdhar)
router.put('/uploadAadhar/:id', uploadAadhar)
router.get('/getFollowerTimeline/:id', getFollowerTimeline)




module.exports = router;

