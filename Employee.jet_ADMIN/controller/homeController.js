const User = require('../models/user');
const ToDo = require('../models/toDo');
const Task = require('../models/task');
const Admin = require(`../models/admin`);

module.exports.home = async (req , res)=>{
    if(!req.user){
        return res.render('landingPage' , {
            layout: 'blank_layout',
            title: 'Employee.Jet | Admin'
        });
    }

    
    //populate the admin home page
    const admin = await Admin.findById(req.user._id);
    return res.render('home', {
        layout: 'blank_layout',
        title: 'Employee.Jet | ADMIN | Home',
        onPage: 'dashboard'
    });
}

