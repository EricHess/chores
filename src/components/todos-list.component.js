import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { COPYFILE_FICLONE_FORCE } from 'constants';


const editSVG = () =>{
    return(
        <svg  xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Слой_1" x="0px" y="0px" width="23px" height="23px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
            <path d="M968.161,31.839c36.456,36.456,36.396,95.547,0,132.003l-43.991,43.991L792.138,75.83l43.991-43.991  C872.583-4.586,931.704-4.617,968.161,31.839z M308.238,559.79l-43.96,175.963l175.963-43.991l439.938-439.938L748.147,119.821  L308.238,559.79z M746.627,473.387v402.175H124.438V253.373h402.204l124.407-124.438H0V1000h871.064V348.918L746.627,473.387z"/>
        </svg>
    )
}

const completeSVG = () =>{
    return(
        <svg height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient y2="157.23" x2="0" y1="211.23" gradientUnits="userSpaceOnUse" id="0"><stop stop-color="#2fae61"/><stop offset="1" stop-color="#4bdf88"/></linearGradient></defs><circle r="28" cy="184.55" cx="768.86" fill="url(#0)" transform="matrix(.92857 0 0 .92857-681.94-139.37)"/><path d="m773.85 193.97l-1.89-1.89c-.259-.259-.574-.389-.945-.389-.371 0-.686.13-.945.389l-9.116 9.13-4.085-4.099c-.259-.259-.574-.389-.945-.389-.371 0-.686.13-.945.389l-1.89 1.89c-.259.259-.389.574-.389.945 0 .37.13.686.389.945l5.03 5.03 1.89 1.89c.259.259.574.389.945.389.37 0 .685-.13.945-.389l1.89-1.89 10.06-10.06c.259-.259.389-.574.389-.945 0-.37-.13-.685-.389-.945" fill="#fff" fill-opacity=".851" transform="matrix(1.33268 0 0 1.33268-985.46-232.86)"/></svg>
    )
}

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
        <td className="links">
            <Link to={props.loginState ? "/edit/"+props.todo._id : "/login"}>{props.loginState ? editSVG() : "Log In "}</Link>
            <a href="#" data-complete-id={props.todo._id} onClick={(e) =>{props.completeMe(e, props)}}>{completeSVG()}</a>
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
        let completeID = props.todo._id;
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