import React, {Component} from 'react';
import axios from 'axios';

export default class ClearAllButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            changedNow:false
        }
    }

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
        axios.post('http://127.0.0.1:4000/todos/clearAll')
        .then(response => {
            this.props.refreshTrigger();
            return response;
        })
        
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

