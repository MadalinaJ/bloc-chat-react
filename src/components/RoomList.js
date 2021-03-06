import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props){
    super(props);
      this.state = {
        rooms: [],
        name: '',
        showFormForNewRoom: false,
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
      this.roomsRef.on('child_removed', snapshot => {
       this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key) })
     });
    }

  deleteRoom(room){
    this.roomsRef.child(room.key).remove()
  }


    handleChange(e){
      this.setState({name: e.target.value});
    }
    createRoom(newRoomName) {
      this.roomsRef.push({
        name: newRoomName
      });
      this.setState({name: ''});
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
            <h3 className="title-newRoom">Create a new room </h3>
           <input type="textbox" id="newRoomName" name="newRoomName" placeholder="Enter room name..."
               onChange={ this.handleChange }value={this.state.name}></input>

          <div className='cancel-name-room'>
               <input type="button" id="cancel" name="cancel" value="Cancel" onClick={ () => this.handleFormRoomChangeOnPage() }></input>
          </div>

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
          <h2 className="nav-header">Bloc Chat</h2>

          <button className="new-room" onClick={ () => this.handleFormRoomChangeOnPage()}>
            { this.handleButtonForRoomChange() }</button>

          <div className="new-room-form-open">{this.showForm()}</div>
          <table className="table-rooms">
          <tbody >
            {
              this.state.rooms.map((room, index) =>
              <tr className="rooms" key={index}>
                <td className="room" onClick={() => this.props.setRoom(room)}>{room.name}</td>
                <td className='delete-room'><button onClick={() => this.deleteRoom(room)}>delete room</button></td>
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
