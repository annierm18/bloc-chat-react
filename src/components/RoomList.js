import React, { Component } from 'react';


class RoomList extends Component{
  constructor(props) {
    super(props);

    this.createRoom = this.createRoom.bind(this);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      console.log(snapshot);
      this.setState({ rooms: this.state.rooms.concat( room )});
    });
  }

  createRoom(e) {
    e.preventDefault();
    if(this.newRoomName.value === '') {return}
    this.roomsRef.push({
      name: this.newRoomName.value
    });
    this.newRoomName.value = '';
    console.log(this.state.rooms)
  }


  render() {
    return (

        /*this.state.rooms.map(room =>
          <div key={room.key}>
          {room.name}
          </div>
        )*/
      <div>
        <form onSubmit={this.createRoom}>

            <input
              type="text"
              name="name"
              ref={(value) => this.newRoomName = value}
            />
            <input type="submit" />
        </form>
        <div className="room-list">
          <ul>
            {
              this.state.rooms.map( (room,index) => {
                return <li key={index} onClick={() => this.props.setActiveRoom(room) }>{room.name} </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
export default RoomList;
