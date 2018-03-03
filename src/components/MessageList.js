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
        this.props.activeRoom === nextProps.activeRoom;
        this.updateDisplayMessages(nextProps.activeRoom);
  }

  updateDisplayMessages(activeRoom){
    const newArray = this.state.messages.filter( message => message.roomId === activeRoom.key);
    this.setState({displayMessages: newArray});
  }


  render() {
      const activeRoom = this.props.activeRoom;

      const messageBar = (
        <form onSubmit={this.createMessage}>
          <input type="text" value={this.state.content} placeholder="Enter Message" onChange={this.handleChange}/>
          <input type="submit" value="Send" />
          </form>
      );

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
