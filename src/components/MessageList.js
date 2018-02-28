import React, { Component } from 'react';


class MessageList extends Component{
  constructor(props) {
    super(props);

    this.setActiveRoom = this.setActiveRoom.bind(this);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('Messages');
  }


  componentDidMount() {
      console.log(this.props.activeRoomID);
      console.log(this.messagesRef.child('Messages'));
      this.messagesRef.child('Messages')
      /*
          .orderByChild(this.props.activeRoomID)
          .equalTo(this.props.activeRoomID)
      */
          .on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        console.log(snapshot);
        this.setState({ messages: this.state.messages.concat( message )});
      });
  }

  setActiveRoom(e) {
    e.preventDefault();
    if(this.newMessage.value === '') {return}
    this.messagesRef.push({

    username: '',
    content: this.newMessage.value,
    sentAt: this.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.keyID
    });
    this.newMessage.value = '';
    console.log(this.state.messages)
  }

  render() {
    return (
      <section className="message-list">
        <ul className="messages">
        {
          this.state.messages.map( (message,index) => {
          /*  if(message.roomId === this.props.activeRoomId) */
              return(
                <li className="message" key={index}>
                  <div className="message-info">
                    <form onSubmit={this.setActiveRoom}>
                    <input type="text" ref={(value) => this.newMessage = value}/>
                    <input type="submit" value="Post Message"/>
                    </form>
                  </div>
                </li>
                    /* <div className="username">{message.username}</div>
                    <div>
                    <span className="message-content">{message.content}</span>
                    <span className="time-sent">{message.sentAt}</span>
                    </div>
                  </div> */

              )

          })
        }
        </ul>
      </section>
    );
  }

}


export default MessageList;
