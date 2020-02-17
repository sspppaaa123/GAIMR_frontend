import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-ionicons'
export default class AddStream extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{this.props.newStream()}}>
                <Icon name="add-circle-outline" size={50} />
                <Text>Add Stream</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "#ccf7ff",
            padding: 10,
            alignItems: "center"
        }
    }
)