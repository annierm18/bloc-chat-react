import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';

firebase.initializeApp(config);
firebase.database.ServerValue.TIMESTAMP;
var provider = new firebase.auth.GoogleAuthProvider();


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdchR_9wlVnJ0ZdlgnXInaB6YUxIgR8s4",
    authDomain: "bloc-chat-react-94cc3.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-94cc3.firebaseio.com",
    projectId: "bloc-chat-react-94cc3",
    storageBucket: "bloc-chat-react-94cc3.appspot.com",
    messagingSenderId: "813993818145"
  };


  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
      }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });

    firebase.auth().signOut().then(function() {
      }).catch(function(error) {
      });


class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
        activeRoom: '',
        userName: ''

      };
  }

  setActiveRoom(activeRoom){
    this.setState( { activeRoom: activeRoom } );
  }

  setUser(userName){
    this.setState( { userName: userName} );
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RoomList
          firebase={ firebase }
          setActiveRoom={ (activeRoom) => this.setActiveRoom(activeRoom)}
          activeRoom= {this.state.activeRoom}
        />
        <MessageList
          firebase={ firebase }
          activeRoom={ this.state.activeRoom }
        />
        <User
        firebase={ firebase }
        userName={ this.state.userName }
        />
      </div>
    );
  }
}

export default App;
