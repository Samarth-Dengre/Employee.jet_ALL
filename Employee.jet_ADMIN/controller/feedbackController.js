const Admin = require(`../models/admin`);
const Feedback = require('../models/feedback');
const Question = require('../models/question');
const Project = require('../models/project');
const User = require('../models/user');


module.exports.viewAllFeedbacks = async (req, res) => {
    if (!req.user) {
        return res.render('landingPage', {
            layout: 'blank_layout',
            title: 'Employee.Jet | Admin'
        });
    }
    //populate the feedback page
    const admin = await Admin.findById(req.user._id);
    const feedbacks = await Feedback.find({}).populate({ path: 'questions', populate: { path: 'responses', } });
    //console.log(feedbacks);
    return res.render('feedback/viewAll', {
        layout: 'blank_layout',
        title: 'View Feedbacks',
        onPage: 'feedback',
        admin: admin,
        feedbacks: feedbacks
    });
}


module.exports.showFeedback = async (req, res) => {
    if (!req.user) {
        return res.render('landingPage', {
            layout: 'blank_layout',
            title: 'Employee.Jet | Admin'
        });
    }
    const feedback = await Feedback.findById(req.params.id).populate({ path: 'questions', populate: { path: 'responses', populate: { path: 'byEmpObjId' } } });
    let averages = []
    for (let i = 0; i < feedback.questions.length; i++) {
        if (feedback.questions[i].responses.length > 0) {
            let sum = 0;
            let yes = 0;
            for (let j = 0; j < feedback.questions[i].responses.length; j++) {
                //console.log(feedback.questions[i].responses[j].response);
                if (feedback.questions[i].type === 'rating')
                    sum += parseInt(feedback.questions[i].responses[j].response);
                else if (feedback.questions[i].responses[j].response === 'yes')
                    yes++;

            }
            if (feedback.questions[i].type == 'rating')
                averages.push(sum / feedback.questions[i].responses.length);
            else
                averages.push((yes / feedback.questions[i].responses.length) * 100);
        }
        else
            averages.push(0);
    }
    //console.log(feedback);
    //console.log(averages);
    const admin = await Admin.findById(req.user._id);
    return res.render('feedback/show', {
        layout: 'blank_layout',
        title: 'View Feedback',
        onPage: 'feedback',
        admin: admin,
        feedback: feedback,
        averages: averages
    });
}

module.exports.renderCreateFeedback = async (req, res) => {
    if (!req.user) {
        return res.render('landingPage', {
            layout: 'blank_layout',
            title: 'Employee.Jet | Admin'
        });
    }
    const admin = await Admin.findById(req.user._id);
    return res.render('feedback/create', {
        layout: 'blank_layout',
        title: 'Create Feedback',
        onPage: 'feedback',
        admin: admin
    });
}


module.exports.createFeedback = async (req, res) => {
    const feedback = new Feedback({
        name: req.body.title,
        description: req.body.description,
    });
    for (let i = 0; i < req.body.questions.length; i++) {
        if (req.body.questions[i] && req.body.types[i]) {
            const question = new Question({
                question: req.body.questions[i],
                type: req.body.types[i]
            });
            const newQuestion = await question.save();
            //console.log(newQuestion);
            feedback.questions.push(newQuestion._id);
        }
    }
    const newFeedback = await feedback.save();
    res.redirect(`/feedback/${newFeedback._id}`);
};


// Rendering feedback form  so that admin can decide which feedback to send to which employee
module.exports.sendFeedback = async (req, res) => {
    const feedbacks = await Feedback.find({}).populate({ path: 'questions', populate: { path: 'responses', } });
    const project = await Project.findById(req.params.id);
    return res.render(`feedback/sendTo`, {
        layout: 'blank_layout',
        title: 'Send Feedback',
        onPage: 'feedback',
        project: project,
        feedbacks: feedbacks
    });
}

// Sending feedback to employees
module.exports.sendToEmployees = async (req, res) => {
    // return res.redirect(`/`);
    try {
        console.log("bhsvcbvxjgvksld");
        const project = await Project.findById(req.query.pid).populate('team');
        console.log("HEHEHEEEH")
        const feedback = await Feedback.findById(req.query.fid);

        for (let employee of project.team) {
            console.log("Me feedback hu: ", feedback);
            console.log("Me employee hu: ", employee);
            await employee.feedback.push(feedback);
            await employee.save();
        }

        return res.redirect(`back`);
    } catch (error) {
        console.log(`Error in sending feedback to the users:`, error);
        return res.redirect(`back`);
    }
}
