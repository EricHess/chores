const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');
let User = require('./user.model');

app.use(cors());
app.use(bodyParser.json());




//"todos" here is actually the db collection name.. need to alter to also grab user
// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
// const connection = mongoose.connection;


/**
 * EXPIREMENTAL!
 */

let mongUser = mongoose.createConnection("mongodb://127.0.0.1:27017/users")
let mongTodos = mongoose.createConnection("mongodb://127.0.0.1:27017/todos")

mongUser.on("open", function(arg){
    
})

mongTodos.on("open", function(arg){
    // console.log("MongTodos Established")
})

/**
 * mongose.createConnection("mongodb://127.0.0.1:27017/users")
 */


// connection.once('open', function() {
//     console.log("MongoDB Todos database connection established successfully");
// })

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/user/:un/:pw').post(function(req, res) {
    let un = req.params.un;
    let pw = req.params.pw;
    let theUser = mongUser.db.collection("users").findOne({"username":"test"}).then((d) => {
    
        console.log(d)
        res.send(d)
    });
    // console.log(theDB.find({"username":"test"}))
   
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});