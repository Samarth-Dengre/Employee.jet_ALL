const passport = require('passport');
const router = require('express').Router();
const projectController = require(`../controller/projectController`);

// Rendering requests page
router.get('/', passport.checkAuthentication ,  projectController.viewAllProjects);

// Showing project details
router.get('/showDetails/:id', passport.checkAuthentication , projectController.showProject);

module.exports = router