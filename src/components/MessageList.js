import React, { Component } from 'react';


class MessageList extends Component{
  constructor(props) {
    super(props);

    /*this.assignMessage = this.assignMessage.bind(this);*/

    this.state = {
      messages: [],
      messagesToShow: {username: "", content: "", sentAt: "", roomID: ""}
    };

    this.messagesRef = this.props.firebase.database().ref('messages');

  }


  componentDidMount() {
      console.log(this.props.activeRoomID);
      console.log(this.messagesRef.child('Messages'));
      this.messagesRef.child('messages')
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

/*  assignMessage(e) {
    e.preventDefault();
    if(this.newMessage.value === '') {return}

    var roomInfo = {
        username: '',
        content: this.newMessage.value,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoom
      }

    this.messagesRef.push({
      messages: roomInfo,
    });


    this.newMessage.value = '';
    this.setState({messagesToShow: []});

    /*this.messagesFilter(roomInfo.roomId);*/
/*    console.log(this.state.messages)
  }

  messagefilter(roomId) {
    var info = [];
    this.messagesRef.on('value', function(snapshot) {
      var data = snapshot.val();
      Object.entries(data).forEach(
        ([key,value]) => info.push(value)
      );
    });
    var key = roomId;

    for(let i =0; i < info.length; i++) {
      if(info[i].message.roomId === key) {
        this.fill(info[i].message.content)
      }
    }
  }

  fill(x) {
    this.setState({ messagesToShow: this.state.messagesToShow.push(x)})
  }*/

  render() {
    const isRoomChosen = this.props.activeRoom !== '';
    return (
      /*
    <div>
      <div className="message-list">
      {isRoomChosen ? (
          <form onSubmit={this.assignMessage}>
          <input type="text" ref={(value) => this.newMessage = value}/>
          <input type="submit" value="Post Message"/>
          </form>
      ) : (null)}
      </div>


      <div className="message-info">
      <ul>
       {isRoomChosen ? (
          this.state.messages.map( (message,index) => {
            return  <li className="message" key={index}>{message.name}</li>*/

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
/*s
                     <div className="username">{message.username}</div>
                    <div>
                    <span className="message-content">{message.content}</span>
                    <span className="time-sent">{message.sentAt}</span>
                    </div>
                  </div>
                     if(message.roomId === this.props.activeRoomId)
            })


}



          ) : (null)}
        </ul>
      </div>*/



export default MessageList;
