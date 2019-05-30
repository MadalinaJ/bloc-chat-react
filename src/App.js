import React, { Component} from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyDFrGlK6X1JoyI9lx_Tq3faXSCJDp-c8Fo",
    authDomain: "bloc-chat-f01bb.firebaseapp.com",
    databaseURL: "https://bloc-chat-f01bb.firebaseio.com",
    projectId: "bloc-chat-f01bb",
    storageBucket: "bloc-chat-f01bb.appspot.com",
    messagingSenderId: "305435679418",
    appId: "1:305435679418:web:48be94312e299f25"
  };

  firebase.initializeApp(firebaseConfig);
  var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        activeRoom: '',
        user:'',
    }
  }

  setRoom(room){
this.setState({activeRoom:room});
  }

  setUser(user){
    this.setState({ user: user });
  }

  render() {
    return (

    <div className="App">

    <User
    firebase={firebase}
    user={this.state.user}
    setUser={ (user) => this.setUser(user)}/>

    <RoomList
    firebase={firebase}
    setRoom={this.setRoom.bind(this)}
    />

    <div className="messageL">
      <MessageList
      firebase={firebase}
      setRoom={this.state.activeRoom}
      />
    </div>
  </div>
  );
}
}

export default App;
