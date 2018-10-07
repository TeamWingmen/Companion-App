/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import { Spinner, Button } from './src/components/common';
import Login from './src/components/Login/Login';
import Tasks from './src/components/Tasks';
import SignUp from './src/components/SignUp';
import Connect from './src/components/Connect';
import { StackNavigator } from 'react-navigation';
import Recordings from './src/components/Recordings';
import Notes from './src/components/Notes';


class App extends Component {

  render() {
    return (
      <AppStackNavigator />
    );
  }
}

export default App;

const AppStackNavigator = new StackNavigator({
  Login: {screen: Login},
  Tasks: {screen: Tasks},
  SignUp: {screen: SignUp},
  Connect: {screen: Connect},
  Recordings: {screen: Recordings},
  Notes: {screen: Notes}
})
