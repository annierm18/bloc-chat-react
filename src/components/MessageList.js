import React, { Component } from 'react';


class MessageList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      displayMessages: [],
      messagesToShow: []
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(snapshot);
      this.setState({ messages: this.state.messages.concat( message )}, () => this.updateDisplayMessages(this.props.activeRoom));
    });
  }

  componentWillReceiveProps(nextProps){
    this.updateDisplayMessages(nextProps.activeRoom);
  }

  updateDisplayMessages(activeRoom){
    const newArray = this.state.messages.filter( message => message.roomId === activeRoom.key);
    this.setState({displayMessages: newArray});
  }

  createNewMessages = (e) => {
    e.preventDefault();
     if(this.newMessage.value === '') {return}

     var roomInfo = {
         username: this.props.user ? this.props.user.displayName : "guest",
         content: this.newMessage.value,
         sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
         roomId: this.props.activeRoom.key
         }

    this.messagesRef.push(roomInfo);

    this.newMessage.value = '';


    /*this.messagesRef.push({
      content: this.newMessages.value
    });
    this.setState({messages: this.newMessages.value });*/
  }

/*  createUserName(user){
    this.props.setUser(user);
  }*/


  render() {
  const isRoomChosen = this.props.activeRoom !== '';
  return(
    <div>
    {isRoomChosen ? (
      <form onSubmit={this.createNewMessages}>
          <input
            type="text"
            name="name"
            ref={(value) => this.newMessage = value}
          />
          <input className="button2" type="submit" value="Post Message"/>
      </form>

      ) : (null)}

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
      </div>
    );
  }
}



export default MessageList;
