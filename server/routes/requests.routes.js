const express = require("express");
const router = express.Router();

const {getUsersSendRequests,getUsersReceivedRequests,acceptRequest,rejectRequest,getStatus,requestAction} = require('../controllers/request.controller');

router.get('/usersSendRequests/:id', getUsersSendRequests)
router.get('/usersReceivedRequests/:id', getUsersReceivedRequests)
router.put('/acceptRequest', acceptRequest)
router.put('/rejectRequest', rejectRequest)
router.get('/getStatus/:id', getStatus)
router.post('/requestAction', requestAction)

module.exports = router;