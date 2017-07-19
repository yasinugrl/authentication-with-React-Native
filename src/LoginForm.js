import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import firebase from 'firebase';
import Button from './ortak/Button';
import Card from './ortak/Card';
import CardSection from './ortak/CardSection';
import Spinner from './ortak/Spinner';


class LoginForm extends Component {
  state ={ email: '', password: '', loading: false };
  clickLogin() {
    this.setState({ loading: true });
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.loginSucces.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.loginSucces.bind(this))
          .catch(this.loginFail.bind(this));
      });
  }
  loginSucces() {
    console.log('başarılı');
    this.setState({ loading: false });
  }

  loginFail() {
    console.log('Hatalı');
  }

  renderButton() {
    if (!this.state.loading) {
      return <Button onPress={this.clickLogin.bind(this)}> GİRİŞ </Button>;
    }
    return <Spinner size="small" />;
  }
  render() {
    const { inputStyle } = styles;
    return (
      <Card>
        <CardSection>
          <TextInput
            placeholder="E-mail"
            style={inputStyle}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
        <TextInput
          secureTextEntry
          placeholder="Şifre"
          style={inputStyle}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {

inputStyle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    flex: 1
  },

};

export default LoginForm;
