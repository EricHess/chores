import React, {Component} from 'react';
import axios from 'axios';

export default class ClearAllButton extends Component {

    bringUpConfirmationBox() {
        let clearPassword = prompt("Please enter the clear password", "");
        let txt;
        if (clearPassword == null || clearPassword == "") {
            txt = "User cancelled the prompt.";
        } else if (clearPassword === "135183"){
            this.sendDeleteCommandToMongo()
        } else {
            console.log(clearPassword)
            alert("Wrong Password")
        }
    }

    sendDeleteCommandToMongo() {
        
    }

    componentDidMount() {
        let $this = this;
        let buttonElement = document.querySelector("#clearButton");
        buttonElement.addEventListener("click", function(){
            $this.bringUpConfirmationBox();
        })
    }

    render() {
        return (
            <button id="clearButton">Clear Out Tasks (Password Required)</button>
        )
    }
}


// db.todos.insertOne(
//     { "todo_description" : "canvas",
//       "todo_responsible" : "aaaa",
//       "todo_priority" : "Medium",
//       "todo_completed" : "false"
//     }
//  )