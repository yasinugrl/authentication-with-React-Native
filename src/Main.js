import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import Header from './ortak/Header';
import LoginForm from './LoginForm';
import CardSection from './ortak/CardSection';
import Spinner from './ortak/Spinner';
import Button from './ortak/Button';

class Main extends Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyA0OB1h4De3Xsh6DC8GEnXEsSq0lpoHc5g',
    authDomain: 'kimlikdogrulama-f033e.firebaseapp.com',
    databaseURL: 'https://kimlikdogrulama-f033e.firebaseio.com',
    projectId: 'kimlikdogrulama-f033e',
    storageBucket: 'kimlikdogrulama-f033e.appspot.com',
    messagingSenderId: '627759298568'
  });

  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  clickLogout() {
    firebase.auth().signOut();
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
          <Button onPress={this.clickLogout.bind(this)}> ÇIKIŞ </Button>
        </CardSection>
      );
      case false:
        return (
          <LoginForm />
      );
      default:
       return (
         <View>
          <Spinner size="large" />
         </View>
       );

    }
  }


  render() {
    return (
      <View>
        <Header headerText="Giriş Ekranı" />
        {this.renderContent()}
      </View>
    );
  }
}

export default Main;
