import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, StatusBar} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner, Header} from './common';
import Modal from "react-native-modal";

export default class Connect extends Component {
  static navigationOptions = {
  title: 'Smart Notes',
  headerTitleStyle :{textAlign: 'center',alignSelf:'center', color:'white'},
      headerStyle:{
          backgroundColor:'#349bff',
      }
    }

    state = {code: ''};

render() {
  return(
    <KeyboardAvoidingView behavior="padding" style={styles.container} style={styles.container}>
    <View style={styles.container}>
      <View style = {styles.container2}>
        <Text style={styles.heading}>
          Please enter the four digit code
        </Text>
        <TextInput
          placeholder="Pin Code"
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          autoCorrect={false}
          secureTextEntry
          maxLength={4}
          keyboardType='numeric'
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
        />
        <TouchableOpacity
        style={styles.buttonContainer}
        >
        <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>
      </View>
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
