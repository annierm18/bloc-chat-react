import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';



// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdchR_9wlVnJ0ZdlgnXInaB6YUxIgR8s4",
    authDomain: "bloc-chat-react-94cc3.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-94cc3.firebaseio.com",
    projectId: "bloc-chat-react-94cc3",
    storageBucket: "bloc-chat-react-94cc3.appspot.com",
    messagingSenderId: "813993818145"
  };

  firebase.initializeApp(config);



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      user: null
    };
  }

  setActiveRoom(activeRoom){
    this.setState( { activeRoom: activeRoom } );
  }

  setUser(user){
    console.log(user);
    this.setState( { user: user} );
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="body">
          <div id="col1">
            <RoomList
              firebase={ firebase }
              setActiveRoom={ (activeRoom) => this.setActiveRoom(activeRoom)}
              activeRoom= {this.state.activeRoom}
            />
          </div>
          <div id="col2">
            <MessageList
              firebase={ firebase }
              activeRoom={ this.state.activeRoom }
              user={ this.state.user }
            />
          </div>
        </div>
          <User
            firebase={ firebase }
            setUser={ (user) => this.setUser(user)}
            user={ this.state.user }
          />
      </div>
    );
  }
}

export default App;
