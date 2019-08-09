import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { COPYFILE_FICLONE_FORCE } from 'constants';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/login/"}>Log In</Link>
        </td>
    </tr>
)

const TodoEditor = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={props.loginState ? "/edit/"+props.todo._id : "/login"}>{props.loginState ? "Edit " : "Log In "}</Link>
            <a href="#" data-complete-id={props.todo._id} onClick={(e) =>{props.completeMe(e, props)}}>Complete</a>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], isLoggedIn:this.props.loginState};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/',{params:{name:this.props.listOut}})
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate(prevProp, prevState) {
        if(JSON.stringify(prevProp.loginState) !== JSON.stringify(this.props.loginState)){
            this.setState({isLoggedIn:this.props.loginState})
        }
        if(JSON.stringify(prevState.todos) !== JSON.stringify(this.state.todos)){
            axios.get('http://localhost:4000/todos/',{params:{name:this.props.listOut}})
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })   
        }
    }

    complete = (e, props) =>{
        let completeID = e.target.getAttribute("data-complete-id");
        axios.post('http://localhost:4000/todos/complete/'+completeID)
        .then(response =>{
            
        })
        .catch = (err) =>{
            console.log(err)
        }
        props.todo.todo_completed=true
    }


    todoList() {
        let _this  = this;
        return this.state.todos.map(function(currentTodo, i) {
            return <TodoEditor completeMe= {_this.complete} loginState = {_this.state.isLoggedIn} todo={currentTodo} key={i} />;
        })  


    }

    render() {
        return (
            <div>
                <h3>{this.props.listOut} Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>

                </table>

            </div>

        )
    }
}