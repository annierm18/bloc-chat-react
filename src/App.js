import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
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
      </div>
    );
  }
}

export default App;