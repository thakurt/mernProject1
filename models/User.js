const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true

    },

    profilepic: {
        type: String,
        default: " "
    }
},
    {
        timestamps: true // it will create our updated and created at time
    });

module.exports = mongoose.model("User", UserSchema)