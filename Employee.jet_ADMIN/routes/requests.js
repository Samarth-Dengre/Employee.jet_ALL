const passport = require('passport');
const router = require('express').Router();
const requestController = require('../controller/requestController');

// Rendering requests page
router.get('/', passport.checkAuthentication ,  requestController.renderRequests);

module.exports = router;