import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(n) {
        this.setState({ searchInput: n.target.value })    
            if(n.target.value==="")return this.props.dispatch({ type: 'putSearchResults', res: [] });
        let body = JSON.stringify({
            query: n.target.value
        })
        fetch('/search', {
            method: "POST",
            body: body
        }).then(function (res) {
            return res.text()
        }).then(function (resBody) {
            console.log(this.props)
            console.log("response body:", resBody)
            let parsed = JSON.parse(resBody)
            this.props.dispatch({ type: 'putSearchResults', res: parsed })
        }.bind(this))
    }
    handleSubmit(n) {
        n.preventDefault()
        console.log("query is", this.state.searchInput)
        let body = JSON.stringify({
            query: this.state.searchInput
        })
        fetch('/search', {
            method: "POST",
            body: body
        }).then(function (res) {
            return res.text()
        }).then(function (resBody) {
            console.log(this.props)
            console.log("response body:", resBody)
            let parsed = JSON.parse(resBody)
            this.props.dispatch({ type: 'putSearchResults', res: parsed })
        }.bind(this))
    }
    render() {
        return (<form onSubmit={this.handleSubmit}>
            <input type="searchClick" onChange={this.handleChange} type="search" placeholder="search"></input>
            <input type="submit"></input>
        </form>)
    }
}
let ConnectedSearchForm = connect()(SearchForm)

export default ConnectedSearchForm