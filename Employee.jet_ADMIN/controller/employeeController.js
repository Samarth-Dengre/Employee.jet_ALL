const User = require('../models/user');
const Crypto = require('crypto');
const Project = require('../models/project');
const Task = require('../models/task');
const ToDo = require('../models/toDo');


// Rendering employees page
module.exports.renderEmployees = async (req, res) => {
    try {
        const user = await User.find({}).sort(`-joinedOn`);
        return res.render('employees/employee', {
            layout: 'blank_layout',
            title: 'Employees',
            onPage: 'employee',
            users: user
        });
    } catch (error) {
        console.log("Error in rendering employees page: ", error);
        return res.redirect('/');
    }
}

// rendering add new employee page
module.exports.renderAddEmployeeForm = async (req, res) => {
    return res.render('employees/addNewEmployeeForm', {
        layout: 'blank_layout',
        title: 'Add Employee',
        onPage: 'employee'
    });
}

// Adding new employee
module.exports.addNewEmployee = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            designation: req.body.designation,
            empId: req.body.empId,
            level: req.body.level,
            supervisor: null,
            address: req.body.address,
            phnNo: req.body.phnNo,
            email: req.body.email,
            joinedOn: req.body.joinedOn,
            releasedOn: req.body.releasedOn,
            password: Crypto.randomBytes(2).toString('hex'),
            avatar: "../uploads/users/avatars/avatar-1655900644429",
            projects: []
        });
        await user.save();
        return res.redirect('/employees');

    } catch (error) {
        console.log("Error in adding new employee: ", error);
        return res.redirect('/employees');
    }
}

// removing employee from organization
module.exports.remove = async (req, res) => {
    try {
        const uid = req.params.id;
        let user = await User.findById(uid);
        if (user.projects.length > 0) {
            user.projects.forEach(async (project) => {
                let projectData = await Project.findById(project).populate(`team`);
                let remove = await Project.findByIdAndUpdate(project, {
                    $pull: { $team: uid }
                });
                await remove.save();
                if (projectData.supervisor == uid) {
                    console.log("Its project data: ", projectData);
                    projectData.team.forEach(async (member) => {
                        let memberData = await User.findById(member);
                        memberData.supervisor = null;
                        memberData.projects = [];
                        let projectsToDoList = memberData.projectsToDoList;
                        let toDo = await ToDo.findById(projectsToDoList);
                        if (toDo.tasks.length > 0) {
                            for (let task of toDo.tasks) {
                                await Task.deleteOne({ _id: task });
                            }
                        }
                        await ToDo.deleteOne({ _id: projectsToDoList });
                        memberData.projectsToDoList = null;
                        await memberData.save();
                        await Project.deleteOne({ _id: project });
                    });
                }
            });
            user.projects = [];
            await user.save();
            let projectsToDoList = user.projectsToDoList;
            let toDo = await ToDo.findById(projectsToDoList);
            for (let task of toDo.tasks) {
                await Task.deleteOne({ _id: task });
            }

            await ToDo.deleteOne({ _id: projectsToDoList });
            let privateToDo = user.privateToDoList;
            let privateToDoList = await ToDo.findById(privateToDo);
            if (privateToDoList != null) {
                for (let task of privateToDoList.tasks) {
                    await Task.deleteOne({ _id: task });
                }
            }
            await ToDo.deleteOne({ _id: privateToDo });
        }
        await User.findByIdAndDelete(uid);
        return res.redirect('/employees');
    } catch (error) {
        console.log("Error in removing employee: ", error);
        return res.redirect('/employees');
    }
}


// Showing employee profile
module.exports.showProfile = async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.render('employees/profile', {
        layout: 'layout',
        onPage: 'employee',
        title: 'Profile',
        user: user
    });
}