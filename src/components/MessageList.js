import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props){
    super(props);
      this.state = {
        messages: [],
      }
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.roomsRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) })
     });
   }

    render() {
      return(
        <section className="MessageList">
        <h3>{this.props.setRoom.name}</h3>
          <table className="messages">
          <tbody>
          {
            this.state.messages.filter((message) => this.props.setRoom.key === message.roomID)
             .map((message, index) =>
             <tr key={index}>
        <td>
             {message.content}
             {message.sentAt}
             {message.username}
        </td>
       </tr>)
        }

          </tbody>
          </table>
        </section>
      )
    }

}

export default MessageList;
