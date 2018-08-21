import React, { Component } from 'react';
//import firebase from 'react-native-firebase';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { Text, View, StyleSheet, TouchableHighlight, Share, TouchableOpacity, TextInput } from 'react-native';

export default class Notes extends Component {
  static navigationOptions = {
    title: 'Notes',
    headerTitleStyle :{textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle:{
            backgroundColor:'#349bff',
        }
  }
  state = { noteData: ''};


  constructor(props) {
    super(props);
    this._shareMessage = this._shareMessage.bind(this);
    this._showResult = this._showResult.bind(this);
    this._saveNote = this._saveNote.bind(this);
    //this.state = { result: ''};
   //this.ref = firebase.firestore().collection('testNotes');
  }

  _showResult(result) {
    this.setState({result})
  }

  _shareMessage(){
    Share.share({ message: 'this is a shared message'})
    .then(this._showResult);
  }
  _saveNote(){
    this.ref = firebase.firestore().collection('Notes');
    this.ref.add({
      note: this.state.noteData,
    });
  }
  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style = {styles.input}
          onSubmitEditing={() => this.noteData.focus()}
          value={this.state.noteData}
          onChangeText={noteData => this.setState({ noteData })}
        />
        <TouchableOpacity
          onPress={this._shareMessage}
          style = {styles.buttonContainer}
        >
          <Text style = {styles.buttonText}>
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._saveNote}
          style = {styles.buttonContainer}
        >
          <Text style = {styles.buttonText}>
            Save
          </Text>
        </TouchableOpacity>
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
