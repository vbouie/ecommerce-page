import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';


class ViewCart extends Component {
    constructor() {
        super()
        this.state = {
            items: [],
        }
        this.displayItems = this.displayItems.bind(this)
    }
    componentDidMount() {
        fetch('/displayItems', {
            method: "POST",
            credentials: "same-origin",
        }).then(function (x) {
            console.log(x.body);
            return x.text()
        }).then(function (responseBody) {
            let items = JSON.parse(responseBody)
            console.log('this is the response' , items)
            this.setState({ items: items })
        }.bind(this))
    }
    onToken = (token) => {
        fetch('/save-stripe-token', {
          method: 'POST',
          body: JSON.stringify(token),
        }).then(response => {
          response.json().then(data => {
            alert(`Thank you for your order!, ${data.email}`);
          });
        });
    }
    displayItems(itemAndCount) {
        let item = itemAndCount.item
        let count = itemAndCount.count
        let deleteThis = function () {
            fetch('/removeItems', {
                method: "POST",
                credentials: "same-origin",
                body: JSON.stringify({itemID: item._id})
            }).then(function (x) {
                console.log(x.body);
                return x.text()
            }).then(function (responseBody) {
                let filtereditems = this.state.items.filter( function (element) {
                    if ( element.item._id === item._id) {
                          element.count = element.count-1
                        if( element.count <= 0) {
                            return false
                        }
                    }
                    return true
                })
                this.setState({ items: filtereditems })
            }.bind(this))
        }
        deleteThis = deleteThis.bind(this)
    
        return (
            <div className="items_cart">
               <img className="img_cart" src= {'/' + item.imageLocation}></img>
                <div>{item.description}</div>
                <h5>Price</h5>
                <div> ${item.price}</div>
                <h5>Description</h5>
                <div>{item.location}</div>
                <div>{count}</div>
                <div><button className="delete" onClick={deleteThis}>Delete</button></div>
            </div>
        )
    }
    render() {
        if (this.state.items.length === 0) {
            return (<div className="emptyCart"><h1>your cart is empty!</h1></div>)
        } else {
            let total = 0
            this.state.items.forEach(function (itemAndCount) {
                total+= parseInt(itemAndCount.item.price.replace(/,/g,'')) * (parseInt(itemAndCount.count))
            })
            let numberItems = 0
            this.state.items.forEach(function (itemAndNumber) {
                numberItems+=  1 * parseInt(itemAndNumber.count)
            })
            return (
                <div className="pay"><StripeCheckout
              token={this.onToken}
              stripeKey="pk_test_NR1IgHbtJRlJYvP5SR5gJCl7"/>
                  
                <div className="item_container">
                <link href="https://fonts.googleapis.com/css?family=Cardo|Playfair+Display+SC|Yrsa" rel="stylesheet"></link>
                    {this.state.items.map(this.displayItems)}
                </div>
                <div className="number_items">Number of Items in Cart: <br/>{numberItems}</div> 
                <div className="total"> Total: ${total} </div>
                </div>
            )
        }
    }
}
export default ViewCart