import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import ShowAccount from "./ShowAccount"

class MyAccount extends Component {
    constructor() {
        super()
        this.state = {
            showEdit: false,
            name: "",
            email: "", 
            address: ""
        }
        this.showEditInfo = this.showEditInfo.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
    }
    showEditInfo() {
        this.setState({ showEdit: !this.state.showEdit })
    }
    handleNameChange (n) {
     let newName = n.target.value
     this.setState({
         name: newName
     })
    }
    handleEmailChange (n) {
     let newEmail = n.target.value
     this.setState({
         email: newEmail
     })
    }
    handleAddressChange (n) {
     let newAddress = n.target.value
     this.setState({
         address: newAddress
     })
    }
    onSubmit(n) {
        n.preventDefault()
        this.setState({
            name: "",
            email: "",
            address: ""
        })
        let infoResponse = function (res) {
            if (res) {
                alert("Your Information has been Saved!")
            } else {
                this.setState({error: true})
            }
    }
        infoResponse = infoResponse.bind(this)
        fetch('/addInfo', {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                address: this.state.address
            })
        }).then(function (x) {
            return x.text()
        }).then(infoResponse)
    }
    render() {
        return (
            <div>
                <button className="sellItemsBtn" onClick={this.showEditInfo}> Edit My Information </button>
               <ShowAccount />
                {this.state.showEdit ?
                    <form className="myInfoBox" onSubmit={this.onSubmit}>
                    <div className="infoBox">
                        <div>Name:</div>
                        <input value={this.state.name} onChange={this.handleNameChange}></input>
                        <div>Email Address:</div>
                        <input value={this.state.email} onChange={this.handleEmailChange}></input>
                        <div>Shipping Address</div>
                        <input value={this.state.address} onChange={this.handleAddressChange}></input>
                        <input className="myInfo" type="submit"></input>
                        </div>
                    </form>
                    :
                    null
                }
            </div>
            
        )
    }
}
export default MyAccount