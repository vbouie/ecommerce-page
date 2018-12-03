import React, { Component } from 'react';
import './App.css';

class Chat extends Component {
    constructor() {
        super()
        this.state = {
            messages: [{ name: "agent: \n", message: "Hello, what would you like help with? \n 1. Shipping \n 2. Returns \n 3. Questions about an item " }],
            inputBoxContents: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.possibleResponses = this.possibleResponses.bind(this)
    }
    handleChange(n) {
        this.setState({ inputBoxContents: n.target.value })
    }
    possibleResponses(userMessage) {
        let shippingResponse = function(){
        let response = {name: "agent", message: "We ship worldwide, is there anything else i can help you with?"}
        this.setState({messages: this.state.messages.slice(0,-1).concat(response)})
        } 
        shippingResponse = shippingResponse.bind(this)
        let defaultResponse = function () {
            let response = {name: "agent", message: "Sorry i cannot help you with that, you can email us here. \n Can i help you with anything else?"}
            this.setState({messages: this.state.messages.slice(0, -1).concat(response)})
        }
        defaultResponse = defaultResponse.bind(this)
        let returnsResponse = function() {
            let response = {name: "agent", message: "We accept returns within 30 days of purchase. \n Can I help you with anything else?"}
            this.setState({messages: this.state.messages.slice(0, -1).concat(response)})
        }
        returnsResponse = returnsResponse.bind(this)
        let itemsResponse = function() {
            let response = {name: "agent", message: "You can email us a link of the item here and we will respond within 2 business days \n Anything else that you need help with?"}
            this.setState({messages: this.state.messages.slice(0, -1).concat(response)})
        }
        itemsResponse = itemsResponse.bind(this)
        let goodDayResponse = function() {
            let response = {name: "agent", message: " Thank You! Have a good day :)"}
            this.setState({messages: this.state.messages.slice(0,-1).concat(response)})
        }
        goodDayResponse = goodDayResponse.bind(this)
        let mainMenuResponse = function () {
            let response = {name: "agent", message: "What would you like to ask me about : \n 1. Shipping \n 2.Returns \n 3.Questions about an item "}
            this.setState({messages: this.state.messages.slice(0, -1).concat(response)})
        }
        mainMenuResponse = mainMenuResponse.bind(this)
        if (userMessage === "shipping" || userMessage === "ship" || userMessage === "Shipping" || userMessage === "Ship" || userMessage === " would like to know about the shipping") {
            return (setTimeout(shippingResponse, 2500))
        } else if(userMessage === "returns" || userMessage === "Returns" || userMessage === "return items" || userMessage === "Return Items") {
            return (setTimeout(returnsResponse, 2500))
        } else if (userMessage === "item" || userMessage === "question about item" || userMessage === "Question about Item") {
            return(setTimeout(itemsResponse, 2500))
        } else if (userMessage === "No" || userMessage === "No Thanks" || userMessage === "no thanks" || userMessage === "no") {
            return (setTimeout(goodDayResponse, 2500))
        } else if (userMessage === "Yes" || userMessage === "yes" || userMessage === "yeah") {
            return(setTimeout(mainMenuResponse, 2500))
        } else {
            return(setTimeout(defaultResponse, 2500))
        }
}
componentDidUpdate() {
    this.chatend.scrollIntoView(false)
}
handleSubmit(n) {
    n.preventDefault()
    let newMessage = {name: "me", message: this.state.inputBoxContents}
    let typing = {name:"agent", message:"typing..."}
    this.possibleResponses(this.state.inputBoxContents)
    this.setState({ inputBoxContents: "", messages: this.state.messages.concat([newMessage,typing])})
}
render() {
    
    let showMessage = function (x) {
        return (<div className="chatMessage">{x.name}: {x.message}</div>)
    }
    showMessage = showMessage.bind(this)
    let chatMessages = this.state.messages.map(showMessage)
    return (
    <div className="theChat">
    
    <div className="message_container">
    <div className="chat_header"></div>
        {chatMessages}
        <div ref={(function (thediv) {this.chatend= thediv}.bind(this))}></div>
        </div>
        <form onSubmit={this.handleSubmit}>
            <div className="chat">
                <input className="inputchat"onChange={this.handleChange} value={this.state.inputBoxContents} type="text">
                </input>
                <input className="sendBtn" type="submit" value="send"></input>
            </div>
        </form>
    </div>
    )
  }
}

export default Chat 