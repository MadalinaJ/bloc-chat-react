import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
      this.state = {
        rooms: [],
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
           this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }

    handleChange(e){
      this.setState({name: e.target.value});
    }
    createRoom(newRoomName) {
      this.roomsRef.push({
        name: newRoomName
      });
      this.setState({name: newRoomName});
      this.setState({ showFormForNewRoom: false });
    }


    formRoomOpen(){
      this.setState({ showFormForNewRoom:true });


    }

    formRoomClose(){
      this.setState({showFormForNewRoom:false });
    }


    handleFormRoomChangeOnPage(){
       if(!this.state.showFormForNewRoom){
       this.formRoomOpen();
    } else{
       this.formRoomClose();
    }
    }

    handleButtonForRoomChange(){
     if(!this.state.showFormForNewRoom){
       return (
         <span>New Room</span>
       );
     } else{
       return (
         <span>Cancel</span>
       );
     }
    }

    showForm(){
      if(this.state.showFormForNewRoom){
        return (
          <form id="newRoomForm">
            <h3>Create a new room </h3>
           <input type="text" id="newRoomName" name="newRoomName" placeholder="Enter room name..."
               onChange={ this.handleChange }value={this.state.name}></input>
           <div className="bt-create-room">
             <input type="button" id="submit" name="submit" value="Create Room" onClick={ () => this.createRoom(this.state.name)}></input>
           </div>

          </form>
        );
      }
      else{
        return null;
      }
    }



    render() {
    return (
       <section className="RoomList">
       <div className="rooms">
              <h2 className="header">Bloc Chat</h2>

              <button className="new-room" onClick={ () => this.handleFormRoomChangeOnPage()}> { this.handleButtonForRoomChange() }</button>
              <div className="new-room-form-open">{this.showForm()}</div>
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
