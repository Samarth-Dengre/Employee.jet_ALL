const passport = require(`passport`);
const router = require('express').Router();
const feedbackController = require(`../controller/feedbackController`);

router.get('/', passport.checkAuthentication , feedbackController.viewAllFeedbacks);  //route to view all feedbacks
router.get('/create',passport.checkAuthentication , feedbackController.renderCreateFeedback);    //route to render create feedback page
router.post('/create', passport.checkAuthentication ,feedbackController.createFeedback);    //route to create feedback
router.get('/:id', passport.checkAuthentication ,feedbackController.showFeedback);    //route to show particular feedback

// Decide which feedback to show
router.get(`/sendFeedback/:id`, passport.checkAuthentication , feedbackController.sendFeedback);

// Send feedback to employees
router.get(`/sendToEmployees` , passport.checkAuthentication , feedbackController.sendToEmployees);

module.exports = router;