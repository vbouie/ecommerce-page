import React, { Component } from 'react';
import Reviews from "./Reviews"
import App from  "./App"
import './App.css';
import { Link } from 'react-router-dom'

class Details extends Component {
    constructor() {
        super()
        this.state = {
            item: null,
            showReviewForm: false
        }
        this.addToCart = this.addToCart.bind(this)
        this.formatDetails = this.formatDetails.bind(this)
        this.alertUser = this.alertUser.bind(this)
        this.addReview = this.addReview.bind(this) 
    }
    
    formatDetails(item, details) {
        let reviews = []
        if(item.reviews)
            reviews = item.reviews;
        return (<div>
            
            <div className="continue_shopping"><Link to="/"><button onClick={this.backToMenu}>Continue Shopping</button></Link></div>
        <div className="container">
        
          <div className="items_details">
            <div> {item.description} </div>
            <div> {item.price}</div>
            <div> {item.location} </div>
            <div classname="add_to_cart"><button onClick={this.addToCart}>Add to Cart</button></div>
            <div classname="write_review"><button onClick={this.addReview}>Write a Review</button></div>
            </div>
   
            <div className="review_box">Comments:{item.reviews.map(review => {
                return (<div className="sep_review_box"><br/>{review.username}: <br/> {review.review}</div>
            )
            })}
            </div>
            <div> <img className="img" src= {'/' + item.imageLocation}></img> </div>
            </div>
            
        </div>
        
        )
       
    }

    alertUser() {
        if (this.addToCart) {
            alert("Item Added to Cart")
        }
    }
    addReview() {
        this.setState({ showReviewForm: !this.state.showReviewForm })
    }
    addToCart() {
        this.alertUser()
        fetch('/addItemstoCart', {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({ itemID: this.props.itemID }
            )
        }).then(function (x) {
            return x.text()
        }).then(function () {
        })
    }
    componentDidMount() {
        fetch('/getDetails', {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({ itemID: this.props.itemID }
            )
        }).then(function (x) {
            return x.text()
        }).then(function (response) {
            let parsed = JSON.parse(response)
            this.setState({ item: parsed })
        }.bind(this))
    }
    render() {

        if (!this.state.item) {
            return <div>loading item</div>
        }
        return (<div>
            {this.state.showReviewForm ? <Reviews  id={this.state.item._id}/> : null}
            <div>{this.formatDetails(this.state.item)}</div>
           
        </div>
        )
    }
}
export default Details
