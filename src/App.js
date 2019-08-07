import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Login from "./components/login.component";

import logo from "./logo.png";

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {usersOfApp:["All", "Ava", "Reagan", "Noelle"],isLoggedIn:localStorage.getItem("loggedInState") || false};
}

updateLoggedInState = (e, prop) =>{
  if(e){
    //need to set a cookie for logged in state
    this.setState({isLoggedIn: true});
    localStorage.setItem("loggedInState", true)
    prop.history.push("/")
    //NEED TO NOW CREATE A LOG OUT BUTTON SO THAT THE LOCAL STORAGE DOES NOT PERSIST
  }
}

ChangeLoginStatus = () =>{
  if(this.state.isLoggedIn == "true"){
    localStorage.removeItem("loggedInState");
    this.setState({isLoggedIn:false}) 
  }else{
    window.history.pushState(null,"Log In","/login")
  }
}

MyLoginPage = (props) => {
  return (
    <Login 
      updateLoggedInState={this.updateLoggedInState.bind(this)}
      {...props}
    />
  );
}

MyTodosList = (props) => {
  let _this = this;
  return (
      this.state.usersOfApp.map(function(currentUser, i) {
        return <TodosList loginState = {_this.state.isLoggedIn} listOut={currentUser} key={i} />;
      })  
    )  
}


  render() {
    return (

      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Chores App</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>

                <li className="navbar-item">
                  <a className="nav-link" href="#" onClick={this.ChangeLoginStatus}>{this.state.isLoggedIn ? "Logout" : "Login"}</a>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={this.MyTodosList} />
          <Route path="/login" exact render={this.MyLoginPage} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />

        </div>
      </Router>
    );
  }
}

export default App;
