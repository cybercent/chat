import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = { username: 'daniel', jwt: '', messages: [], new_message: ''}

  login(e) {
    e.preventDefault()

    let query = `mutation {
      logged_in_user(
        auth: {
          username: "${this.state.username}"
        }) {
        jwt,
        user {
          id
          username
        }
      }
    }`
     fetch('http://localhost:3000/graphql', {
       method: 'post',
       headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
       },
       body: JSON.stringify({
         query: query
       })
     })
       .then(response => {
         return response.json()
       })
       .then(data => {
         let user = data.data.logged_in_user
         if (user) {
           this.setState({ jwt: user.jwt }, () => {
             this.retrieveMessages()
           })
         } else {
           alert('Incorrect username')
         }
 })
}


  sendMessage(e) {
    console.log(this.state.new_message)
}

  retrieveMessages() {
    let query = `query {
          messages {
            id,
            content,
            user {
              id,
              username
            }
          }
        }`

    fetch('http://localhost:3000/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.jwt}`,
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ messages: data.data.messages })
      })
    }


  renderMessages() {
    let messages = this.state.messages.map(message => {
      return (
        <div className="row message-bubble" key={message.id}>
          <p className="text-muted">{message.user.username}</p>
          <span>{message.content}</span>
        </div>
      )
    })
    return (
      <div className="container">
        <div className="row">
          <div className="panel panel-default">
            <div className="panel-heading">Chat</div>
            <div className="panel-body">
              <div className="container">{messages}</div>
              <div className="panel-footer">
                   <div className="input-group">
                    <input
                     type="text"
                     className="form-control"
                     onChange={e => this.setState({ new_message: e.target.value })}
                     />
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button" onClick={e => this.sendMessage(e)}>Send</button>
                    </span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

    renderLogin() {
      return (
      <div className="container">
        <div className="row">
          <div className="panel panel-default">
            <div className="panel-heading">Chat</div>
            <div className="panel-body">
              <div className="container">
                <form className="form-inline">
                  <div className="form-group connect">
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control"
                      value={this.state.username}
                      onChange={e => this.setState({ username: e.target.value })}
                    />
                  </div>

                  <button className="btn btn-primary" onClick={e => this.login(e)}>
                    Connect
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    }

  render() {
    return (
      <div className="App">
        {this.state.jwt == '' && this.renderLogin()}
        {this.state.jwt != '' && this.renderMessages()}
      </div>
    )
  }

}

export default App;
