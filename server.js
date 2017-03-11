/**
 * Created by pawan on 29/1/17.
 */

const express = require('express');
const fs = require('fs');

const app = express();
let todoList = [];

fs.readFile('list.txt', function (err, data) {
    if (!err && data != '') {
        todoList = JSON.parse(data);
    }
});

app.get('/addTodo', function (req, res) {
    todoList.push({'todo': req.query.todo, 'state': req.query.state});
    fs.writeFile("list.txt", JSON.stringify(todoList), function (err) {
        if (err) throw err;
        console.log("written successfully");
    })
    res.send(todoList);
})

app.get('/setDone', function (req, res) {
    todoList[req.query.id].state = req.query.state;
    fs.writeFile("list.txt", JSON.stringify(todoList), function (err) {
        if (err) throw err;
        console.log("written successfully");
    })
    res.send(todoList);
})

app.get('/remove', function (req, res) {
    todoList.splice(req.query.id, 1);
    fs.writeFile("list.txt", JSON.stringify(todoList), function (err) {
        if (err) throw err;
        console.log("written successfully");
    })
    res.send(todoList);
})



app.get('/fetchTodos', function (req, res) {
    res.send(todoList);
})

app.use('/', express.static(__dirname + "/public_html"));

app.listen(4444, function () {
    console.log("server started at 4444");
})
