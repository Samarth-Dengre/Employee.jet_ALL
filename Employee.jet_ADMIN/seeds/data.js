const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.users = [
  {
    name: "John Doe",
    designation: "CEO",
    empId: "1",
    level: 1,
    supervisor: null,
    address: "Bangalore",
    phnNo: "+91 1234567890",
    email: "johndoe@empjet.ac.in",
    joinedOn: new Date(),
    releasedOn: null,
    password: "123456",
    avatar: "../uploads/users/avatars/avatar-1655900644429",
    projects: [],
  },
  {
    name: "Jane Doe",
    designation: "Manager",
    empId: "2",
    level: 2,
    supervisor: null,
    address: "Bangalore",
    phnNo: "+91 932193291",
    email: "janedoe@empjet.ac.in",
    joinedOn: new Date(),
    releasedOn: null,
    password: "123456",
    avatar: "../uploads/users/avatars/jane.png",
    projects: [],
  },
  {
    name: "Hugh Doe",
    designation: "Manager",
    empId: "3",
    level: 2,
    supervisor: null,
    address: "Bangalore",
    phnNo: "+91 928383212",
    email: "hughdoe@empjet.ac.in",
    joinedOn: new Date(),
    releasedOn: null,
    password: "123456",
    avatar: "../uploads/users/avatars/avatar-1655900644429",
    projects: [],
  },
  {
    name: "Jack Doe",
    designation: "Employee",
    empId: "4",
    level: 3,
    supervisor: null,
    address: "Bangalore",
    phnNo: "+91 928383212",
    email: "jackdoe@empjet.ac.in",
    joinedOn: new Date(),
    releasedOn: null,
    password: "123456",
    avatar: "../uploads/users/avatars/avatar-1655900644429",
    projects: [],
  },
  {
    name: "Jill Doe",
    designation: "Employee",
    empId: "5",
    level: 3,
    supervisor: null,
    address: "Bangalore",
    phnNo: "+91 928383212",
    email: "jilldoe@empjet.ac.in",
    joinedOn: new Date(),
    releasedOn: null,
    password: "123456",
    avatar: "../uploads/users/avatars/try2.png",
    projects: [],
  },
  {
    name: "Samarth Doe",
    designation: "Employee",
    empId: "6",
    level: 3,
    supervisor: null,
    address: "Bangalore",
    phnNo: "+91 928383212",
    email: "samdoe@empjet.ac.in",
    joinedOn: new Date(),
    releasedOn: null,
    password: "123456",
    avatar: "../uploads/users/avatars/avatar-1655900644429",
    projects: [],
  },
];

module.exports.todoDataPvt = [
  {
    task: "Task 1",
    endDate: new Date(),
    deadline: new Date(),
  },
  {
    task: "Task 2",
    endDate: new Date(),
    deadline: new Date(),
  },
  {
    task: "Task 3",
    endDate: new Date(),
    deadline: new Date(),
  },
];

const getId = async (empId) => {
  const res = await User.findOne({ empId: empId });
  return res._id;
};

module.exports.returnProjects = async () => {
  return [
    {
      name: "Improve UI",
      description:
        "Improve the UI of user side of Employee.jet . This will help the user to have a better experience. Use AJAX calls to update data on the user side. Use Bootstrap to make the UI look good.",
      supervisor: await getId("2"),
      team: [await getId("4"), await getId("5"), await getId("2")],
      tags: ["NodeJS", "ExpressJs", "Bootstrap"],
    },
  ];
};

module.exports.admins = [
  {
    name: "Vaibhav Doe",
    empId: "0",
    address: "Bangalore",
    phnNo: "+91 928383212",
    email: "vjdoe@empjet.ac.in",
    joinedOn: new Date(),
    password: "123456",
    avatar: "../uploads/users/avatars/avatar-1655900644429",
  },
];

module.exports.questions = [
  {
    question: "Rate the behavior of the manager",
    type: "rating",
  },
  {
    question: "Rate the team coordination",
    type: "rating",
  },
  {
    question: "Rate the work distribution among the team",
    type: "rating",
  },
  {
    question: "Rate the ease of communication with the team and manager",
    type: "rating",
  },
  {
    question: "Was the deadline sufficient?",
    type: "binary",
  },
];

module.exports.feedback = {
  name: "General Information about Users",
  description:
    "This feedback is used to record and analyze the general information about our employees' performance",
};

module.exports.responses = async () => {
  return [
    {
      byEmpObjId: await getId("5"),
      response: "5",
    },
    {
      byEmpObjId: await getId("5"),
      response: "4",
    },
    {
      byEmpObjId: await getId("5"),
      response: "3",
    },
    {
      byEmpObjId: await getId("5"),
      response: "3",
    },
    {
      byEmpObjId: await getId("5"),
      response: "yes",
    },
  ];
};

module.exports.finalSeed = {
  pvtToDo: [
    {
      task: "Learn about AJAX",
      endDate: new Date(),
      deadline: new Date(),
    },
    {
      task: "Integrate AJAX into Private ToDo",
      endDate: new Date(),
      deadline: new Date(),
    },
  ],
  projectToDo: [
    {
      task: "Create Dashboard Page with AJAX",
      endDate: new Date(),
      deadline: new Date(),
    },
    {
      task: "Implement Chat System",
      endDate: new Date(),
      deadline: new Date(),
    },
    {
      task: "Create specific Routes",
      endDate: new Date(),
      deadline: new Date(),
    },
    {
      task: "Handle the errors",
      endDate: new Date(),
      deadline: new Date(),
    },
    {
        task: "Put a logo on header",
        endDate: new Date(),
        deadline: new Date(),
        }
  ],
};
