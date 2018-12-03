
import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";

class ShowItems extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    fetch('/getAllItems')
      .then(function (x) {
        return x.text()
      }).then(function (items) {
        let parsed = JSON.parse(items)
        this.setState({ items: parsed })
      }.bind(this))
  }
  showAllItems(item) {
    return (<div>
      <div className="items"><Link to={"/details/" + item._id}>
      <link href="https://fonts.googleapis.com/css?family=Cardo|Playfair+Display+SC|Yrsa" rel="stylesheet"></link>
      
        <div className="itemName">{item.description}</div>
        <img className="img_main"src={item.imageLocation}></img>
        <h5>Price</h5>
        <div>${item.price}</div>
        <h5>Description</h5>
        <div>{item.location}</div>
        
        </Link></div>
        </div>
    )   
  }
  render() {
    return (
      
      <div className="item_container">{this.state.items.map(this.showAllItems)}</div>
    );
  }
}
export default ShowItems

