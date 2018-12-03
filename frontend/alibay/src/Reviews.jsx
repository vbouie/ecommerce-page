import React, { Component } from 'react';
import './App.css';

class Reviews extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            review: ""
        }
        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onReviewChange = this.onReviewChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    onNameChange(n) {
        this.setState({ name: n.target.value })
    }
    onEmailChange(n) {
        this.setState({ email: n.target.value })
    }
    onReviewChange(n) {
        this.setState({ review: n.target.value })
    }
    handleSubmit(n) {
        n.preventDefault() 
        this.setState({name: "", review: ""})
        let updateReviews = function (res) {
            if (res) {
                alert("Your Review has been Posted!")
            } else {
                this.setState({error: true})
            }
            updateReviews = updateReviews.bind(this)
        }
        fetch('/addReview',  {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify({_id: this.props.id, reviews: this.state.review})
        }).then(function (x) {
            return x.text()
        }).then(updateReviews)
    } 
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="reviewBox">
                    <div className="username"> Name</div>
                    <input type="text" onChange={this.onNameChange} value={this.state.name}></input>
                    <div className="email">E-mail</div>
                    <input type="text" onChange={this.onEmailChange} value={this.state.email}></input>
                    <div className="reviewerBox">Review</div>
                    <input type="text" onChange={this.onReviewChange} value={this.state.review}></input>
                    <input className="btn" type="submit"></input>
                </div>
            </form>
        )
    }
}
export default Reviews 