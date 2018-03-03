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
    this.messagesRef.child('messages').on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(snapshot);
      this.setState({ messages: this.state.messages.concat( message )});
    });
  }


  componentWillReceiveProps(nextProps){
      /*this.props.setActiveRoom(room) = nextProps.activeRoom;*/

        this.props.activeRoom === nextProps.activeRoom;

        this.updateDisplayMessages(nextProps.activeRoom);
  }

  updateDisplayMessages(activeRoom){
    const currentRoom = this.state.messages.filter( message => message.roomId === activeRoom.key);

    this.setState({displayMessages: currentRoom});
    var newelement = {
      content: '',
      username: '',
      sentAt: '',
      roomId: ''
    }

    this.setState({
        displayMessages: this.state.displayMessages.concat([newelement])
    })
  }


  render() {
    return (

            <div className="message-list">
              <div>
                <h2>{this.props.activeRoom.key}</h2>
              </div>
              ref={(value) => this.newMessages = value}

              { this.state.displayMessages.map( (displayMessage, index ) =>
                  <div key={index}>
                    <h3>{this.props.username}</h3>
                    <span>{this.state.sentAt}</span>
                    <p>{this.state.content}</p>
                  </div>
                )
              }
            </div>

    );
  }

}



export default MessageList;
