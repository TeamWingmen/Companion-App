import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Share, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import firebase from 'firebase';

export default class Recording extends Component{
  static navigationOptions = {
    title: 'Recordings',
    headerTitleStyle: {textAlign: 'center', alignSelf: 'center', color: 'white'},
      headerStyle:{
        backgroundColor:'#349bff'
      }
  }

  render() {
    return(
    <View>
      
    </View>
  );
  }
}
