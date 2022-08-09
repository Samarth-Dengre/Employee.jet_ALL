const mongoose = require(`mongoose`);
// For uploading files
const multer = require(`multer`);
const path = require(`path`);
const AVATAR_PATH =path.join(`/uploads/users/avatars`);
let storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , path.join(__dirname , `..` , AVATAR_PATH));
    }, filename: function(req , file , cb){
        cb(null , file.fieldname+`-`+Date.now());
    }
});

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    empId: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phnNo: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    joinedOn: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
} , {
    // Keep the created and updated time
    timestamps: true
});

// Creating static functions
adminSchema.statics.uploadAvatar = multer({storage: storage}).single(`avatar`); //.single(``) implies that only a single file will uploaded for the field name avatar
adminSchema.statics.avatarPath = AVATAR_PATH;  //We made AVATAR_PATH global

const Admin = mongoose.model(`Admin` , adminSchema);

module.exports = Admin;