import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

export default class Note extends React.PureComponent {



    render() {
      return(
        <TouchableHighlight
        >
          <View style={{ flex: 1, height: 48, flexDirection: 'row',
                          alignItems: 'center' }}>
                <View style = {styles.textContainer}>
                  <Text style={styles.textStyle}> {this.props.title} </Text>
                </View>
                <View style = {styles.timeStampContainer}>
                  { (
                    <Text> </Text>
                  )}
                </View>
              </View>
            </TouchableHighlight>
      );
  }
}
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    },
  timeStampContainer: {

  },
  textStyle: {
    fontSize: 16,
    width: '100%',
    flex:8,
    justifyContent:'center',
    alignItems: 'center'
  },
  timeStampStyle: {

  }
});
