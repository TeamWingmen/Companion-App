import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, StatusBar} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, Header} from '../common';
import Modal from "react-native-modal";

export default class Login extends Component {
  static navigationOptions = {
    header: 'none'
  }
  state = { email: '', password: '', error: '', loading: false, loggedIn: null, isModalVisible: false
};

    _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    componentWillMount() {
      firebase.initializeApp({
        apiKey: "AIzaSyAdMXxMh6024CROCpLG_0lhENeqd_gowPE",
        authDomain: "smartnotes-ef8bb.firebaseapp.com",
        databaseURL: "https://smartnotes-ef8bb.firebaseio.com",
        projectId: "smartnotes-ef8bb",
        storageBucket: "smartnotes-ef8bb.appspot.com",
        messagingSenderId: "793803621543"
    });
    
    //const firestore = firebase.firestore();
    //const settings = { timestampsInSnapshots:true};
    //firestore.settings(settings);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn: true });
    }
    else {
      this.setState({ loggedIn: false });
    }
  });
  }

  onButtonPress() {
    const { email, password } = this.state

    this.setState({ error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginfail.bind(this));

  }

  onLoginfail() {
    this.setState({ isModalVisible: true, error: 'Authentication Failed, please check credendials and try again', loading: false })
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    );
  }

  renderContent() {
    switch (this.state.loggedIn)
      {
          case true:
            return (
          <View style = {styles.container2}>
            <StatusBar barStyle="light-content"/>
            <TouchableOpacity
              style = {styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Notes')}
            >
              <Text style = {styles.buttonText}>
                View Notes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('Connect')}
            >
              <Text style = {styles.buttonText}>
                Join Meeting
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style = {styles.buttonContainer}
              onPress={() => firebase.auth().signOut()}
            >
              <Text style = {styles.buttonText}>
                LogOut
              </Text>
            </TouchableOpacity>
          </View>
          );
          case false:
            return (
              <View style={styles.container2}>
              <StatusBar
                barStyle="light-content"
              />
              <TextInput
                placeholder="Please enter username or email"
                placeholderTextColor="rgba(255,255,255,0.8)"
                style={styles.input}
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.8)"
                style={styles.input}
                returnKeyType="go"
                secureTextEntry
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                ref={(input) => this.passwordInput = input}
              />

              <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.container2}>
                  <Text style={styles.errorTextStyle}>{this.state.error}!</Text>
                  <TouchableOpacity
                  onPress={this._toggleModal}
                  style={styles.buttonContainer}
                  >
                    <Text style={styles.buttonText}>OK!</Text>
                  </TouchableOpacity>
                </View>
            </Modal>

              {this.renderButton()}
              <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate('SignUp')}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              </View>
            );
          default:
            return <Spinner size="large" />;
      }
  }

  render() {
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.headingWrapper}>
        <Text style={styles.heading}> Smart Notes </Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('../../images/BlueLogo.png')}
          />
          <Text style={styles.title}>
            The smarter solution to your note taking needs
          </Text>
        </View>

        <View style={styles.formContainer}>
          {this.renderContent()}
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
    width: 200,
    height: 200
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
