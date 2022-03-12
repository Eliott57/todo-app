const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    description: String,
    done: Boolean,
});

module.exports = mongoose.model('Todo', todoSchema);