const genericController = require('../../helpers/HelperController');
const todoServices = require('../../services/ServiceTodos');

exports.list = (req, res) => {
    return genericController(req, res, async() => {
        const todos = await todoServices.list();
        if(todos) res.status(200).json(todos);
    });
}

exports.getOneItem = (req, res) => {
    return genericController(req, res, async() => {
        const todo = await todoServices.getOneItem(req.params.id);
        if(todo) res.status(200).json(todo);
    });
}

exports.postItem = (req, res) => {
    return genericController(req, res, async() => {
        const todo = await todoServices.postItem(req.body.newTodo);
        if(todo) res.status(200).json(todo);
    });
}

exports.deleteItem = (req, res) => {
    return genericController(req, res, async() => {
        await todoServices.deleteItem(req.params.id);
        res.status(200).json(req.params.id);
    });
}

exports.patchItem = (req, res) => {
    return genericController(req, res, async() => {
        const todo = await todoServices.patchItem(req.body.modifiedTodo);
        if(todo) res.status(200).json(todo);
    });
}
