import React, { Component } from 'react';

  class MessageList extends Component{
    constructor(props) {
      super(props);

      this.handleSignInClick = this.handleSignInClick.bind(this);
      this.handleSignOutClick = this.handleSignOutClick.bind(this);

      this.state = {
      loggedIn: false,
      name: ''
      }

  }

    componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      });
    }

    handleSignInClick(e){
      e.preventDefault();
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup( provider );
      this.setState({ loggedIn: true })
    }

    handleSignOutClick(e){
      e.preventDefault();
        this.props.firebase.auth().signOut();
        this.setState({ loggedIn: false,
                        name: '' })
    }

    assignName(){
    this.setState({name: this.props.user.displayName})
    }


  render(){
    return (
    <div>
      <form onSubmit={this.state.name}>
          <input
            type="text"
            name="User Name"
          />
          <input type="submit" />
        /*  if(this.props.user === null){
            <input name="Guest" />
          }*/
      </form>


       <div id ="sign-in">
            <button onClick={this.handleSignInClick()}> Log In </button>
        </div>
        <div id= "sign-out">
            <button onClick={this.handleSignOutClick()}> Log Out </button>
        </div>
      </div>
    );
  }
}

export default MessageList;
