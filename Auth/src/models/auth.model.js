const mongoose = require("mongoose")

userSchema = new mongoose.Schema({
name: String,
email: {
type: String,
unique: [true, 'email already exist']
},
password: String
})

userModel = mongoose.model('users', userSchema);

module.exports = userModel