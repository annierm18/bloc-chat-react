import React, { Component } from 'react';


class MessageList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messagesToShow: {username: "", content: "", sentAt: "", roomID: ""}
    };

    this.messagesRef = this.props.firebase.database().ref('messages');

  }


  componentDidMount() {
      console.log(this.props.activeRoomID);
      console.log(this.messagesRef.child('Messages'));
      this.messagesRef.child('messages').on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        console.log(snapshot);
        this.setState({ messages: this.state.messages.concat( message )});
      });
  }


  render() {
    return (

            <div className="message-list">
              <div>
                <h2>{this.props.activeRoom.name}</h2>
              </div>

              { this.state.messages.filter( message => message.roomID === this.props.activeRoom.key).map( (message, index ) =>
                  <div key={index}>
                    <h3>{message.username}</h3>
                    <span>{message.sentat}</span>
                    <p>{message.content}</p>
                  </div>
                )
              }
              </div>

    );
  }

}



export default MessageList;
