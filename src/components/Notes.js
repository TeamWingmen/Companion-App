import React, { Component } from 'react';
//import firebase from 'react-native-firebase';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FlatList, Text, View, StyleSheet, TouchableHighlight, Share, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';
import Note from './Note';

export default class Notes extends Component {
  static navigationOptions = {
    title: 'Notes',
    headerTitleStyle :{textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle:{
            backgroundColor:'#349bff',
        }
  }

  constructor() {
    super();
    this.ref = firebase.firestore().collection('Notes');
    this.unsubscribe = null;

    this.state = {
      textInput: '',
      timeStampInput:'',
      loading: true,
      Notes: []
    };
  }

 updateTextInput(value) {
   this.setState({ textInput: value});
 }
 updateTimeStampInput(value) {
   this.setState({ timeStampInput: value});
 }

 addNote() {
   this.ref.add({
     title: this.state.textInput,
     timeStamp: this.state.timeStampInput
   });

   this.setState({
     textInput:'',
     timeStampInput:''
   });
 }

 componentDidMount() {
   this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
 }

 componentWillUnmount() {
   this.unsubscribe();
 }

 onCollectionUpdate = (querySnapshot) => {
   const Notes = [];

   querySnapshot.forEach((doc) => {
     const {title, timeStamp } = doc.data();

     Notes.push({
       key:doc.id,
       doc,
       title,
       timeStamp
     });
   });

   this.setState({
     Notes,
     loading: false
   });
 }


  render() {
    return(
      <View style={{ flex: 1}}>
      <FlatList
        data = {this.state.Notes}
        renderItem = {({ item }) => <Note {...item} />}
      />
      <TextInput
        placeholder = {'add Note'}
        value = {this.state.textInput}
        onChangeText = { (text) => this.updateTextInput(text)}
      />
      <TextInput
        placeholder = {'add Timestamp'}
        value = {this.state.timeStampInput}
        onChangeText = { (text) => this.updateTimeStampInput(text)}
      />
      <Button
        title = {'add Note'}
        disabled = {!this.state.textInput.length}
        onPress = {() => {this.addNote()}}
      />
    </View>
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
    height: 200,
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
