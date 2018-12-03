import React, { Component } from 'react';
import './App.css';
import Authentication from "./Authentication"
import SellItems from "./SellItems"
import ShowItems from "./ShowItems"
import Details from "./Details"
import ViewCart from "./ViewCart"
import { Link } from "react-router-dom";
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import MyAccount from './MyAccount';
import Chat from './Chat';
import { BrowserRouter, Route } from "react-router-dom"
import { Button } from 'reactstrap'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      showSellItems: false,
      sessionID: null,
      showCartDetails: false,
      showChat: true
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.sellItems = this.sellItems.bind(this)
    this.cartDetails = this.cartDetails.bind(this)
    this.handleBacktoLogin = this.handleBacktoLogin.bind(this)
    this.accountDetails = this.accountDetails.bind(this)
    this.Chat = this.Chat.bind(this)

  }
  componentDidMount() {
    fetch('/stayLogin', {
      method: "POST", 
      credentials: "same-origin"
    }).then(function (x) {
        return x.text()
      }).then(function (responseBody) {
        this.setState({cookieCheck:true})
        let res = JSON.parse(responseBody)
        if (res.status) {
          this.handleLogin(res.id)
        }
        else {
          this.setState({ loggedIn: false })
      }}.bind(this)
      )

  }
  handleLogin(sessionID) {
    this.setState({ loggedIn: true, sessionID: sessionID })
  }
  handleBacktoLogin() {
    this.setState({ loggedIn: false})
  }
  sellItems() {
    this.setState({ showSellItems: !this.state.showSellItems })
  }
  Chat() {
    this.setState({ showChat: !this.state.showChat})
  }
  accountDetails() {
    return <div> <MyAccount /></div>
  }
  cartDetails() {
    return <div className="cartPage"><ViewCart /></div>
  }
  renderDetails(routerData) {
    let itemID = routerData.match.params.itemID
    return <div className="details"><Details itemID={itemID} /></div>
  }
  addtoCart(routerData) {
    let itemID = routerData.match.params.itemID
    return <ViewCart itemID={itemID} />
  }
  
  render() {
    if(!this.state.cookieCheck)
    return <div>checking cookie</div>

    if (this.state.loggedIn) {
      return (
        <BrowserRouter>
          <div className="main">
          <div className="name_website">Alibay</div>
          <p className="header">
          <link href="https://fonts.googleapis.com/css?family=Noto+Serif" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=PT+Serif" rel="stylesheet"></link>
            <Link to="/"><button className="back" onClick={this.handleBacktoLogin}>LogOut</button></Link>
            <div className="button _container">
            
              <Link className="cart" to={"/cart/"} ><img className="cartPic" src="cart.png"></img></Link>
              <button className="sellItemsBtn" onClick={this.sellItems}>SELL ITEMS</button>
              <Link to="/account">
              <button className="myAccountbtn">MY ACCOUNT</button> 
              </Link>
              <button className="chatButton" onClick={this.Chat}>Chat</button>
            </div>
            {this.state.loggedIn ? <SearchForm /> : null}
            {this.state.loggedIn ? <SearchResults /> : null}
            {this.state.showChat ? <button className="x_button" onClick={this.Chat}>Hide</button>: null}
            </p>
            {this.state.showSellItems ? <SellItems sessionID={this.state.sessionID} /> : null}
            {this.state.showCartDetails ? <ViewCart sessionID={this.state.sessionID} /> : null}
            {this.state.showAccount ? <MyAccount sessionID={this.state.sessionID} /> : null}
            {this.state.showChat ? <Chat sessionID={this.state.sessionID} /> : null}
            <div>
              <Route exact={true} path='/' render={function () { return <ShowItems /> }} />
              <Route exact={true} path='/details/:itemID' render={this.renderDetails} />
              <Route exact={true} path='/addtoCart/:itemID' render={this.addtoCart} />
              <Route exact={true} path='/cart' render={this.cartDetails} />
              <Route exact={true} path='/account' render={this.accountDetails} />
            </div>
            
          </div>
        </BrowserRouter>
      )
    }
    return (
      <div className="authentication">
        <Authentication handleLogin={this.handleLogin} />
      </div>
    )
  }
}
export default App;
