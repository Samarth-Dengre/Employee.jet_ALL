const mongoose = require("mongoose");
const User = require("../models/user");
const ToDo = require("../models/toDo");
const db = require("../config/mongoose");
const Task = require("../models/task");
const Project = require("../models/project");
const Admin = require("../models/admin")
const Feedback = require("../models/feedback");
const Question = require("../models/question");
const Response = require("../models/response");

const users = require("./data").users;
const toDoListPvt = require("./data").todoDataPvt;
const projects = require("./data").returnProjects;
const admins = require("./data").admins;
const feedback = require("./data").feedback;
const questions = require("./data").questions;
const responses = require("./data").responses;
const finalSeed=require("./data").finalSeed;

const saveUsers = async (users) => {
  await User.deleteMany({});
  const Users = await User.insertMany(users);
  console.log("Saved Users")
}

const saveToDoList = async (toDoListPvt) => {
  await ToDo.deleteMany({});
  await Task.deleteMany({});

  const users = await User.find();
  for (let user of users) {
    const emptyToDoList = new ToDo({
      tasks: [],
    });
    const newToDoList = await emptyToDoList.save();
    const temp2 = await User.findByIdAndUpdate(
      user._id.toString(),
      { pvtToDoList: emptyToDoList._id },
      { new: true }
    );
  }
  console.log("ToDoList Saved");
};

const saveProjects = async (projects) => {
  const projectsArray = await projects();
  await Project.deleteMany({});
  let projectsCopy = await Project.insertMany(projectsArray);
  for (let i = 0; i < projectsCopy.length; i++) {
    for (let j = 0; j < projectsCopy[i].team.length; j++) {
      const user = await User.findById(projectsCopy[i].team[j]);
      const toDoList = new ToDo({
        tasks: [],
      });
      for (let i = 0; i < toDoListPvt.length; i++) {
        const temp = new Task(toDoListPvt[i]);
        const newTask = await temp.save();
        toDoList.tasks.push(newTask._id);
      }
      const newToDoList = await toDoList.save();
      const temp2 = await User.findByIdAndUpdate(
        user._id.toString(),
        { projectsToDoList: newToDoList._id, projects: (projectsCopy[i]._id), supervisor: projectsCopy[i].supervisor },
        { new: true }
      );
    }
  }
  console.log("Saved Projects")
}

const saveAdmins = async (admins) => {
  await Admin.deleteMany({});
  await Admin.insertMany(admins);
  console.log("Saved Admins")
}



const saveFeedback = async (feedback, questions) => {
  await Feedback.deleteMany({});
  await Question.deleteMany({});
  await Response.deleteMany({});
  const newFeedback = new Feedback(feedback);
  const responses2 = await responses();
  newFeedback.isFilledBy.push(responses2[0].byEmpObjId);
  for (let i = 0; i < questions.length; i++) {
    const newResponse = new Response(responses2[i]);
    await newResponse.save();
    const question = new Question(questions[i]);
    question.responses.push(newResponse._id);
    const newQuestion = await question.save();
    newFeedback.questions.push(newQuestion._id);
  }
  newFeedback.save();
  console.log("Saved Feedback")
}


const getId = async(empId) => {
  const res = await User.findOne({ empId: empId });
  return res._id;
}


const finalSeeding = async () => {
  console.log("Final Seeding Started");
  const id = await getId("4");
  const user = await User.findById(id);
  let toDoList = await ToDo.findById(user.pvtToDoList.toString());
  console.log(user.pvtToDoList.toString());
  for (let i = 0; i < finalSeed.pvtToDo.length; i++) {
    let task = new Task(finalSeed.pvtToDo[i]);
    let newTask = await task.save();
    await ToDo.findByIdAndUpdate(toDoList._id, { $push: { tasks: newTask._id } }, { new: true });
    //await User.findByIdAndUpdate(id, { $push: { pvtToDoList: newTask._id } }, { new: true });
  }
  console.log("Seeded Private ToDoList");

  //delete all tasks from projectToDo
  await ToDo.findByIdAndUpdate(user.projectsToDoList, { tasks: [] }, { new: true });
  toDoList = await ToDo.findById(user.projectsToDoList);
  for (let i = 0; i < finalSeed.projectToDo.length; i++) {
    let task = new Task(finalSeed.projectToDo[i]);
    let newTask = await task.save();
    await ToDo.findByIdAndUpdate(toDoList._id, { $push: { tasks: newTask._id } }, { new: true });
    //await User.findByIdAndUpdate(id, { $push: { pvtToDoList: newTask._id } }, { new: true });
  }

  console.log("Final Seeding completed!");
}


const seed = async () => {
  await saveUsers(users);
  await saveToDoList(toDoListPvt);
  await saveProjects(projects);
  await saveAdmins(admins);
  await saveFeedback(feedback, questions);
  await finalSeeding();
}

seed();
