'use strict';

var util = require('util');


/*
 * exporty správných názvů - operationId : funkce
 */
module.exports = {
    todoGet: get,
    todoList: list,
    todoCreate: create,
    todoUpdate: update,
    todoDelete: del,
    todoToggle: toggle
};

/*
 * Naše memory DB
 */

var maxId = 0;
var todos = [];

/**
 * Metoda /api/todo
 * @method GET
 */
function list(req, res) {
  res.json(todos);
}


/**
 * Metoda /api/todo
 * @method POST
 */
function create(req, res) {
    if (!req.swagger.params.todo.value) {
        res.statusCode = 500;
        res.send();
        return;
    }

    var text = req.swagger.params.todo.value.text;
    var date = new Date();
    date = date.toISOString();

    var obj = {
        id: maxId++,
        text: text,
        done: false,
        created_at: date,
        updated_at: date,
    };
    todos.push(obj);
    res.json(obj);
}

function indexById(arr, id) {
    for (var i in todos) {
        if (todos[i].id === id) {
            return i;
        }
    }
    return null;
}

/**
 * Metoda /api/todo/{id}
 * @method GET
 */
function get(req, res) {
    if (req.swagger.params.id.value === null) {
        res.send(500);
        return;
    }

    var id = req.swagger.params.id.value;

    var index = indexById(todos, id);

    if (index === null) {
        res.send(404);
        return;
    }

    res.json(todos[index]);
}

/**
 * Metoda /api/todo/{id}
 * @method PUT
 */
function update(req, res) {
    if (req.swagger.params.id.value === null) {
        res.send(500);
        return;
    }

    var id = req.swagger.params.id.value;

    var index = indexById(todos, id);

    if (index === null) {
        res.send(404);
        return;
    }

    var todo = todos[index];

    var text = req.swagger.params.todo.value.text;
    var date = new Date();
    date = date.toISOString();


    todo.text = text;
    todo.updated_at = date;

    todos[index] = todo;
    res.json(todo);
}


/**
 * Metoda /api/todo/{id}/toggle
 * @method POST
 */
function toggle(req, res) {
    if (req.swagger.params.id.value === null) {
        res.send(500);
        return;
    }

    var id = req.swagger.params.id.value;

    var index = indexById(todos, id);

    if (index === null) {
        res.send(404);
        return;
    }

    var todo = todos[index];

    var date = new Date();
    date = date.toISOString();


    todo.done = !todo.done;
    todo.updated_at = date;

    todos[index] = todo;
    res.json(todo);
}

/**
 * Metoda /api/todo/{id}
 * @method DELETE
 */
function del(req, res) {
    if (req.swagger.params.id.value === null) {
        res.send(500);
        return;
    }

    var id = req.swagger.params.id.value;

    var index = indexById(todos, id);

    if (index === null) {
        res.send(404);
        return;
    }

    todos.splice(index, 1);

    res.send();
}
