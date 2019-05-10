import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
      this.state = {
        rooms: [],
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
           this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }

    render() {
    return (
       <section className="RoomList">
       <div className="rooms">
              <h2 className="header">Bloc Chat</h2>
              <table>
              <tbody>
              {
                this.state.rooms.map((room, index) =>
                  <tr className="rooms-row" key={index}>
                    <td className="rooms-data">Room {index +1}</td>
                  </tr>
                )
              }
            </tbody>
            </table>
        </div>
       </section>
    );
  }
}


export default RoomList;
