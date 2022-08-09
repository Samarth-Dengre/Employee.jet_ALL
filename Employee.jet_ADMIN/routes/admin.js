const passport = require(`passport`);
const router = require('express').Router();
const adminController = require(`../controller/adminController`);
const projectController = require(`../controller/projectController`);

// Logging in admin
router.post(`/login` ,  passport.authenticate( `local` , {
    failureRedirect: `/`
}) , adminController.login);

// Admin logout
router.get(`/logout`, passport.checkAuthentication , adminController.logout);

module.exports = router;