import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

class ShowAccount extends Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {
        fetch('/displayInfo', {
            method: "POST",
            credentials: "same-origin",
        }).then(function (x) {
            return x.text()
        }).then(function (responseBody) {
            let info = JSON.parse(responseBody)
            this.setState({ info: info })
        }.bind(this))
    }
    
    render() {
        if (this.state.info === undefined) {
            return <div>Loading...</div>
        } else if (this.state.info === null) {
            return <div className="info_div">No Information Yet </div>
        }
        return (<div>
            <div className="information_header">My Information</div>
            <div className="information_changes">
            
                <div> Name:</div>
                    <div>{this.state.info.name}</div>
                <div> Email:</div> 
                <div>{this.state.info.email}</div>
                <div> Shipping Address: </div> 
                <div>{this.state.info.address}</div>
            </div>
            </div>
    )
    }
}
export default ShowAccount