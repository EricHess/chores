import React, {Component} from 'react';
import axios from 'axios';

export default class SubmitTheList extends Component {

    bringUpConfirmationBox() {
        let submitCode = prompt("Please enter the submit code word", "");
        let txt;
        if (submitCode == null || submitCode == "") {
            txt = "User cancelled the prompt.";
        } else if (submitCode === "135183"){
            this.sendSubmitCommandToIFTTT()
        } else {
            console.log(submitCode)
            alert("Wrong Password")
        }
    }

    sendSubmitCommandToIFTTT() {
        axios.get('https://maker.ifttt.com/trigger/chores_complete/with/key/pclgz7scE-voREcy9mQPZzxhtEdDBtmlsXA7Nh0Y3K7');
    }

    componentDidMount() {
        let $this = this;
        let buttonElement = document.querySelector("#submitButton");
        buttonElement.addEventListener("click", function(){
            $this.bringUpConfirmationBox();
        })
    }

    render() {
        return (
            <button id="submitButton">Submit The Tasks (Password Required)</button>
        )
    }
}