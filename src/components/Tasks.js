import React, { Component } from 'react';
//import firebase from 'react-native-firebase';
import firebase from '@firebase/app';
import '@firebase/firestore';
import { FlatList, Text, View, StyleSheet, TouchableHighlight, Share, TouchableOpacity, TextInput, ScrollView, Button } from 'react-native';
import Task from './Task'

export default class Tasks extends Component {
  static navigationOptions = {
    title: 'Tasks',
    headerTitleStyle :{textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle:{
            backgroundColor:'#349bff',
        }
  }

  constructor() {
    super();
    this.ref = firebase.firestore().collection('Tasks');
    this.unsubscribe = null;

    this.state = {
      textInput: '',
      loading: true,
      Tasks: []
    };
  }

  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  addTask() {
    this.ref.add({
      title: this.state.textInput,
      complete: false
    });

    this.setState({
      textInput:''
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


    onCollectionUpdate = (querySnapshot) => {
      const Tasks = [];

      querySnapshot.forEach((doc) => {
        const {title, complete } = doc.data();

        Tasks.push({
          key:doc.id,
          doc,
          title,
          complete
        });
      });

      this.setState({
        Tasks,
        loading: false
      });
    }


  render() {
    if (this.state.loading) {
      return null; //make this return a loading thing
    }
    return(
      <View style={{ flex: 1}}>
        <FlatList
          data = {this.state.Tasks}
          renderItem = {({ item }) => <Task {...item} />}
        />
        <TextInput
          placeholder = {'add Task'}
          value = {this.state.textInput}
          onChangeText = { (text) => this.updateTextInput(text)}
        />
        <Button
          title = {'add Task'}
          disabled = {!this.state.textInput.length}
          onPress = {() => {this.addTask()}}
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
