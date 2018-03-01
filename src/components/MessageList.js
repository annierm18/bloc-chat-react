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


  componentWillReceiveProps(nextProps) {
      this.messagesRef.child('messages').on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        console.log(snapshot);
        this.props.nextProps.activeRoom;
        this.updateDisplayMessages(nextProps.activeRoom);

      });
  }

  updateDisplayMessages(activeRoom){
    const currentRoom = this.state.messages.filter( message => message.roomID === activeRoom.key);
    this.setState({displayMessages: currentRoom});
  }



  render() {
    return (

            <div className="message-list">
              <div>
                <h2>{this.props.activeRoom.key}</h2>
              </div>

              { this.state.messages.map( (displayMessages, index ) =>
                  <div key={index}>
                    <h3>{displayMessages.username}</h3>
                    <span>{displayMessages.sentAt}</span>
                    <p>{displayMessages.content}</p>
                  </div>
                )
              }
            </div>

    );
  }

}



export default MessageList;
