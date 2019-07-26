import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClearAllButton from "./clear-all-button.component"
import SubmitChores from "./submit-the-list.component"

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
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: [], isLoggedIn:false};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate(prevProp, prevState) {
        if(JSON.stringify(prevState.todos) !== JSON.stringify(this.state.todos)){
            axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })   
        }
    }

    todoList() {
        if(this.state.isLoggedIn === true){
            return this.state.todos.map(function(currentTodo, i) {
                return <TodoEditor todo={currentTodo} key={i} />;
            });
        }else{
            return this.state.todos.map(function(currentTodo, i) {
                return <Todo todo={currentTodo} key={i} />;
            });
        }
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
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
                <aside class="buttonRow">
                    {/* <ClearAllButton></ClearAllButton> */}
                    <SubmitChores></SubmitChores>
                </aside>
            </div>

        )
    }
}