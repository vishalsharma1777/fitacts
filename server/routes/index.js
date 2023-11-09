var express = require('express');
var router = express.Router();

const index = async function (req, res, next) {
  res.send('Server is running on port 3000, Mr. Vishal Sharma.');
}

router.get('/', index);
module.exports = router;
