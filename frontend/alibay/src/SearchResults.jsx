import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { Link } from "react-router-dom";
import SearchForm from './SearchForm'

class SearchResults extends Component {
    render() {
        if (this.props.results === undefined) return (<div></div>)
        let displayResult = function (item) {
            return (<div className="searchItems"><Link to={"/details/" + item._id}>{item.description}</Link> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {item.price}</div>)
        }
        return (<div>{this.props.results.map(displayResult)}
        </div>)
    }
}
let ConnectedSearchResults = connect(function (state) {
    return {
        results: state.searchResults
    }
})(SearchResults)

export default ConnectedSearchResults