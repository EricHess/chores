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
    mongTodos.db.collection("todos").find({}, function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            todos.toArray().then((d) =>{
                res.json(d)
            });
        }
    });
});

todoRoutes.route('/user/:un/:pw').post(function(req, res) {
    let un = req.params.un;
    let pw = req.params.pw;
    let theUser = mongUser.db.collection("users").findOne({"username":un}).then((d) => {    
        res.send(d)
    });
   
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    // console.log(id)
    mongTodos.db.collection("todos").find({}, function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            todos.toArray().then((d) =>{
                for(let i=0;i<d.length;i++){
                    if(d[i]._id == id){
                        res.send(d[i])
                    } 
                }
            });
        }
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
    // Todo.findById(req.params.id, function(err, todo) {
    mongTodos.db.collection("todos").find({}, function(err, todos){
        if (err) {
            console.log(err);
        } else {
            todos.toArray().then((d) =>{
                for(let i=0;i<d.length;i++){
                    if(d[i]._id == req.params.id){
                        let newId = new mongoose.mongo.ObjectID(req.params.id)

                        d[i].todo_description = req.body.todo_description;
                        d[i].todo_responsible = req.body.todo_responsible;
                        d[i].todo_priority = req.body.todo_priority;
                        d[i].todo_completed = req.body.todo_completed;


                        
                        mongTodos.db.collection("todos").findOneAndUpdate(
                            {_id: newId}, 
                            {$set: 
                                {
                                    "todo_description" : d[i].todo_description,
                                    "todo_responsible" : d[i].todo_responsible,
                                    "todo_priority" : d[i].todo_priority,
                                    "todo_completed" : d[i].todo_completed
                                }
                            }, {upsert:true}).then(todoUpdate => {
                            res.json("updated")                       
                        })
                        .catch(err =>{
                            console.log(err)
                        })
                        

                    } 
                }
            });
        }
    })    
});

app.use('/todos', todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});