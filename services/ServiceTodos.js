const Todo = require("../models/Todo/Todo");

exports.list = () => {
    return Todo.find();
}

exports.getOneItem = (id) => {
    return Todo.findOne({
        _id: id
    });
}

exports.postItem = async (todo) => {
    const newTodo = await Todo.create({
        description: todo.description,
        done: false
    });

    await newTodo.save();

    return newTodo;
}

exports.deleteItem = async (id) => {
    await Todo.deleteOne({
        _id: id
    });
}

exports.patchItem = async (modifiedTodo) => {
    const todo = await Todo.findOne({
        _id: modifiedTodo._id
    });

    todo.description = modifiedTodo.description;
    todo.done = modifiedTodo.done;

    await todo.save();

    return todo;
}
