import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(user){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);

  });
  }
  signIn(e){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    this.setState({user: e.target.value});
  }
  signOut(e){
    this.props.firebase.auth().signOut();
    this.setState({user: e.target.value});
  }

  displayUsername(){
  if(this.props.user){
    return(
      <span>{this.props.user}</span>
    );
  }
  }

  render(){
    return(
      <div className='User'>

      <span className='displayUsername'>{this.props.user ? this.props.user.displayUsername:'Guest'}</span>
      <button onClick={this.signIn.bind(this)}>Sign in</button>
      <button onClick={this.signOut.bind(this)}>Sign out</button>


      </div>
    )
  }
}
export default User;
