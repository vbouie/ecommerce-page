import React, { Component } from 'react';
import './App.css';

class Authentication extends Component {
  constructor() {
    super()
    this.state = {
      usernameCurrentValue: "",
      passwordCurrentValue: "",
      signupUsernameCurrentValue: "",
      signupPasswordCurrentValue: "",
      reenteredPassword: "",
      showSignup: false,

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this)
    this.handleSignupUsernameChange = this.handleSignupUsernameChange.bind(this)
    this.handleSignupPasswordChange = this.handleSignupPasswordChange.bind(this)
    this.toggleSignup = this.toggleSignup.bind(this)
    this.handleReenterPassword = this.handleReenterPassword.bind(this)

  }
  handleSignupSubmit(n) {
    n.preventDefault()
    if (this.state.reenteredPassword !== this.state.signupPasswordCurrentValue) {
      alert("your passwords do not match!")
    } else {
    this.setState({
      signupUsernameCurrentValue: "",
      signupPasswordCurrentValue: "",
      reenteredPassword: ""

    })
    fetch('/signup', {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        username: this.state.signupUsernameCurrentValue,
        password: this.state.signupPasswordCurrentValue
      })
    }).then(function (x) {
      return x.text()
    }).then(function (responseBody) {
      alert(responseBody)
    })
  }
}
  handleSubmit(n) {
    n.preventDefault()
    let handleLoginResponse = function (res) {
      res = JSON.parse(res)
      if (res) {
        this.props.handleLogin(res.id)
      } else {
        this.setState({ loginFailed: true })
      }
      if (this.state.loginFailed) {
        alert("login failed!!")
      }
    }
    handleLoginResponse = handleLoginResponse.bind(this)
    fetch('/login', {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({
        username: this.state.usernameCurrentValue,
        password: this.state.passwordCurrentValue
      })
    }).then(function (x) {
      return x.text()
    }).then(handleLoginResponse)
    this.setState({
      usernameCurrentValue: "",
      passwordCurrentValue: ""
    })
  }
  handleUsernameChange(n) {
    let newUsername = n.target.value
    this.setState({
      usernameCurrentValue: newUsername
    })
  }
  handlePasswordChange(n) {
    let newPassword = n.target.value
    this.setState({
      passwordCurrentValue: newPassword
    })
  }
  handleSignupUsernameChange(n) {
    let newUsername = n.target.value
    this.setState({
      signupUsernameCurrentValue: newUsername
    })
  }
  handleSignupPasswordChange(n) {
    let newPassword = n.target.value
    this.setState({
      signupPasswordCurrentValue: newPassword
    })
  }
  handleReenterPassword(n) {
    let finalPassword = n.target.value 
    this.setState({
      reenteredPassword: finalPassword
    })
  }
  toggleSignup() {
    this.setState({ showSignup: !this.state.showSignup })
  }

  render() {
    return (
      <div>
        <div className="signupBox">
        <div className="Signup"></div>
        <div className="Signup">Login</div>
        <form onSubmit={this.handleSubmit}>
          <div className="loginBox">
            <div className="username"> Username</div>
            <div className="loginuser"><input value={this.state.usernameCurrentValue} name="username" onChange={this.handleUsernameChange}></input></div>
            <div className="password">Password</div>
            <div className="loginpass"><input value={this.state.passwordCurrentValue} name="password" type="password" onChange={this.handlePasswordChange}></input></div>
            <input className="btn" type="submit"></input>
            </div>
          </form>
        </div>
          <button className="login" onClick={this.toggleSignup}>Register here</button>
        {this.state.showSignup ?
        <div className="another_signup">
         <form onSubmit={this.handleSignupSubmit}>
          <div className="username"> Pick a Username</div>
          <div className="username"><input value={this.state.signupUsernameCurrentValue} name="username" onChange={this.handleSignupUsernameChange}></input></div>
          <div className="password" type="password">Choose a Password</div>
          <div className="password" type="password"><input value={this.state.signupPasswordCurrentValue} name="password" type="password" onChange={this.handleSignupPasswordChange}></input></div>
          <div className="reenter_password" type="password">Re-enter Password</div>
          <div className="check_password" type="password"><input value={this.state.reenteredPassword} name="password" type="password" onChange={this.handleReenterPassword}></input></div>
          <input className="submit" type="submit"></input>
        </form>
        </div>
          :
          null
        }
      </div>
    );
  }
}
export default Authentication
