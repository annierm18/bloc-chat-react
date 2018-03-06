import React, { Component } from 'react';


class MessageList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      displayMessages: [],
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(snapshot);
      this.setState({ messages: this.state.messages.concat( message )});
    });
  }

  componentWillReceiveProps(nextProps){
    this.updateDisplayMessages(nextProps.activeRoom);
  }

  updateDisplayMessages(activeRoom){
    const newArray = this.state.messages.filter( message => message.roomId === activeRoom.key);
    this.setState({displayMessages: newArray});
  }


  render() {

    return(
        <div className="message-list">
            <h2>{this.props.activeRoom.key}</h2>
            <ul>
              {
             this.state.displayMessages.map( (displayMessage, index ) =>{
                return <div key={index}>{displayMessage.content}</div>
                })
              }
              </ul>
          </div>
      );
  }
}



export default MessageList;
