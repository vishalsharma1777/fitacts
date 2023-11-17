const express = require("express");
const router = express.Router();


const { createUser,userTimeline,getFollowerTimeline,getUserAdhar,uploadAadhar, getUsers,getUserById,getUserTimeline, loginUser, updateFavActivity, getUserFavActivites } = require("../controllers/users.controllers");



router.get('/allUsers', getUsers); //done //1
router.post('/createUser', createUser); //2
router.post('/loginUser', loginUser); //3
router.put('/updateFavActivity', updateFavActivity) //4
router.get('/getUserFavActivites/:id', getUserFavActivites) //5 //done
router.get('/getUserTimeline/:id', getUserTimeline) //6 //done
router.get('/userTimeline/:id', userTimeline) //7 //done
router.get('/getUserById/:id', getUserById) //8 //done
router.get('/getUserAdhar/:id', getUserAdhar) //9 //done
router.put('/uploadAadhar/:id', uploadAadhar) //10
router.get('/getFollowerTimeline/:id', getFollowerTimeline) //11 //done




module.exports = router;

