//need to show error when confirmPassword != password and need asiign firstName and lastName to firebase user
import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, StatusBar} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, Header} from './common';
import Modal from "react-native-modal";

export default class SignUp extends Component {
  static navigationOptions = {
    title: 'Sign Up',
    headerTitleStyle :{textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle:{
            backgroundColor:'#349bff',
        }
  }
  state = { email: '', password: '', confirmPassword: '',error: '', firstName:'', lastName:'', loading: false, loggedIn: null};

  onButtonPress() {
    const { email, password, confirmPassword } = this.state

    this.setState({ error: '', loading: true})
    if (password !== confirmPassword)
    {
      this.setState({ loading: false})
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginfail.bind(this));
    }
  }

  onLoginfail() {
    this.setState({ error: 'Authentication Failed, please check credendials and try again', loading: false })
  }

  onLoginSuccess() {

    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
      confirmPassword:'',
      firstName:'',
      lastName:''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <TouchableOpacity
      style={styles.buttonContainer}
      onPress={this.onButtonPress.bind(this)}
      >
        <Text style={styles.buttonText}>Create User</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('../images/BlueLogo.png')}
          />
          <Text style={styles.title}>
            The smarter solution to your note taking needs
          </Text>
        </View>
        <View style = {styles.container2}>
          <TextInput
            placeholder="Please enter your first name"
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => this.lastName.focus()}
            autoCorrect={false}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />
          <TextInput
            placeholder="Please enter your last name"
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
            autoCorrect={false}
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            ref={(input) => this.lastName = input}
          />
          <TextInput
            placeholder="Please enter email"
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            ref={(input) => this.emailInput = input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => this.confirmPasswordInput.focus()}
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            ref={(input) => this.passwordInput = input}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            style={styles.input}
            returnKeyType="go"
            secureTextEntry
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            ref={(input) => this.confirmPasswordInput = input}
          />
          {this.renderButton()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74b9ff'
  },
  heading : {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold'
  },
  headingWrapper: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: 'white',
    marginTop: 10,
    width: 250,
    textAlign: 'center',
    opacity: 0.8
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    paddingHorizontal:10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 25
  },
  buttonContainer: {
    backgroundColor: '#349bff',
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 25
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '900'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  container2: {
    padding: 20
  }
});
