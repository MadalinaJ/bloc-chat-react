import React, { Component } from 'react';

class MessageList extends Component {

  constructor(props){
    super(props);
      this.state = {
        messages: [],
        username: " ",
        content: " ",
        sentAt: " ",
        roomID: " ",
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
              onChange={ this.handleChange.bind(this)}
              placeholder="write message here"
               value={this.state.content}></input>

              <input className="send" type="button" id="send" name="submit" value="Send"
               onClick={ () => this.createMessage(this.state.content)}></input>
      </form>
    )}else{
       return(
         <h3 className="choose-room-toChat">Please select one of the rooms </h3>
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

   convertTime(timestamp){
		const date = new Date(timestamp);
		let hour = date.getHours()%12 === 0 ? 12 : date.getHours()%12,
			min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
			am = date.getHours() < 12 ? 'am' : 'pm';

		return hour + ':' + min + ' ' + am;
	}

    render() {
      return(
        <section className="MessageList">
        <h3 className='active-room'>{this.props.setRoom.name}</h3>
          <table className="messages">
          <tbody>
          {
            this.state.messages.filter((message) => this.props.setRoom.key === message.roomID)
             .map((message, index) =>
             <tr className="message-data" key={index}>
        <td className="msg-user">{message.username}</td>
        <td className="msg-content">{message.content}</td>
        <td className="timestamp">{this.convertTime(message.sentAt)}</td>
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
