const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage : {
        type: String,
        required: true,
        default: 'https://avatars.dicebear.com/api/identicon/default.svg'
    }
})

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

exports.getUser = function() {
    return mongoose.model("User", userSchema)
}