import React, { Component } from "react"

class Field extends Component {
    state = { 
        notification: this.props.value
    }
    render() { 
        return (
        <a href={this.state.notification[2]}>
            <li class="w3-bar">
                <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right"></span>
                <div class="w3-bar-item">
                <span class="w3-large">{this.state.notification[0]}</span>
                <p></p>
                <span>{this.state.notification[1]}</span>
                </div>
            </li>
        </a>
        );
    }
}
 
export default Field;