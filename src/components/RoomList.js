import React, { Component } from 'react';


class RoomList extends Component{
  construction(props) {
    super(props);

    };

    this.state = {
      rooms: []
    };

    this.roofsRef = this.props.firebase.database().ref('rooms');
  }

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    console.log(snapshot);
    this.setState({ rooms: this.state.rooms.concat( room )});
  });
}

  render() {
    return (
      this.state.rooms.map(room) => {

      });
      roofsRef = {this.roofsRef};

  }
export default RoomList;
