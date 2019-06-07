import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props){
    super(props);
      this.state = {
        messages: [],
        username: " ",
        content: " ",
        sentAt: " ",
        roomId: " ",
      }
      this.messageRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
     this.messageRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) })
     });
   }
   showMessageForm(){
    if(!this.props.setRoom.key == ''){
    return(
      <form id="newMessageForm">
              <input className="message-field"
              type="text" id="newMessage" name="newMessage"
              onChange={ this.handleChange.bind(this) }
               value={this.state.content}></input>

              <input className="send" type="button" id="send" name="submit" value="Send"
               onClick={ () => this.createMessage(this.state.content)}></input>
      </form>
    )}else{
       return(
         <h3 className="choose-room-toChat">For chat please select one of the rooms </h3>
       )
    }
  }


  handleChange(e){
    this.setState({content: e.target.value});
  }
   createMessage(newMessage) {
     this.messageRef.push({
      content: this.state.content,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomID: this.props.setRoom.key,
      username: this.props.user ? this.props.user.displayName : "Guest",
    });
     this.setState({content: ' '});
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
          {this.showMessageForm()}
        </section>
      )
    }

}

export default MessageList;
