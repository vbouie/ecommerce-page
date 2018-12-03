import React, { Component } from 'react';
import './App.css';

class SellItems extends Component {
    constructor() {
        super()
        this.state = {
            description: "",
            price: "",
            location: "",
            imageLocation: ""
        }
        this.descriptionChange = this.descriptionChange.bind(this)
        this.priceChange = this.priceChange.bind(this)
        this.locationChange = this.locationChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }
    descriptionChange(n) {
        let newDescription = n.target.value
        this.setState({
            description: newDescription
        })
    }
    priceChange(n) {
        let newPrice = n.target.value
        this.setState({
            price: newPrice
        })
    }
    locationChange(n) {
        let newLocation = n.target.value
        this.setState({
            location: newLocation
        })
    }
    onSubmit(n) {
        n.preventDefault()
        let sellItemsResponse = function (res) {
            if (res) {
                alert("Your Item has been Posted!")
            } else {
                this.setState({ error: true })
            }
            if (this.state.error) {
                alert("failed to post item")
            }
        }
        sellItemsResponse = sellItemsResponse.bind(this)
        fetch('/addItems', {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({
                description: this.state.description,
                price: this.state.price,
                location: this.state.location,
                imageLocation: this.state.imageLocation,
                sessionID: this.props.sessionID

            })
        }).then(function (x) {
            return x.text()
        }).then(sellItemsResponse)
    }
    
    uploadFile(x) {
        let uploadFiles = function (res) {
            if (res) {
                this.setState({imageLocation: res}) 
            }
        }
        uploadFiles = uploadFiles.bind(this)
        let filename = x.name;
        let fileExtension = filename.split('.').pop()
        fetch('/upics?ext=' + fileExtension,  {
            method: "POST",
            credentials: "same-origin",
            body: x
         }).then(function (res) {
             return res.text()
         }).then(uploadFiles)
    }
    render() {
        return (
            <div>
                <div className="sellItems">
                    <form className="form_item"onSubmit={this.onSubmit}>
                    <div><img src={'/'+this.state.imageLocation}></img></div>
                        Item Name
                    <div><input type="text" onChange={this.descriptionChange} value={this.state.description} ></input></div>
                        Item Price
                    <div>$<input type="text" onChange={this.priceChange} value={this.state.price} ></input></div>
                        Item Description
                    <div><input type="text" onChange={this.locationChange} value={this.state.location}></input></div>
                    <input type="file" id="input" onChange={e => this.uploadFile(e.target.files[0])} /> 
                        <div>Post Item</div>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
        )
    }
}
export default SellItems;