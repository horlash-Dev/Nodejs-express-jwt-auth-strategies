const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const User = new Schema({
    username: { type: Schema.Types.String, min: 6, unique: true, required: true},
    pass: {type: Schema.Types.String, min: 6, unique: true, required: true},
    location: Schema.Types.String,
    phone: Schema.Types.Number
})

module.exports = mongoose.model("User", User)