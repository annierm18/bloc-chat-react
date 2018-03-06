import React, { Component } from 'react';

class User extends Component{
    componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      });
    }

    handleSignInClick = (e) => {
      e.preventDefault();
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOutClick = (e) => {
      e.preventDefault();
      this.props.firebase.auth().signOut();
    }

  render(){
    return (
      <div>
        {this.props.user ? this.props.user.displayName : 'no user'}
        {this.props.user ?
          <div id= "sign-out">
            <button onClick={this.handleSignOutClick}> Log Out </button>
          </div>
          :
           <div id ="sign-in">
            <button onClick={this.handleSignInClick}> Log In </button>
           </div>
        }
        </div>
    );
  }
}

export default User;
