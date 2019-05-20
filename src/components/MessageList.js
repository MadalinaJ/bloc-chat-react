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
            this.state.messages.filter((message) => this.props.setRoom.key === message.roomId)
             .map((message, index) =>
             <tr className="message-data" key={index}>
        <td className="msg-user">{message.username}</td>
        <td className="msg-content">{message.content}</td>
        <td className="timestamp">{message.sentAt}</td>
       </tr>)
        }

          </tbody>
          </table>
        </section>
      )
    }

}

export default MessageList;
