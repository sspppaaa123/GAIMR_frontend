import React from 'react'
import {Image, TouchableOpacity, Dimensions, ImageBackground,Text} from 'react-native'
import {View} from "react-native";
const deviceWidth = Dimensions.get("window").width;

export class Logo extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../../assets/header.png')} style={{width: '100%', height: '100%'}}>
            <View style={{ flex: 1, alignItems: 'flex-end'}}>
            <Image
                source={require('../../assets/logo.png')}
                resizeMode = "contain"
                style = {{width: 55,height: 55,alignSelf:'flex-end'}}
            />
            </View>
            </ImageBackground>
        );
    }
}

export class Middle extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../../assets/header.png')} style={{width: '100%', height: '100%'}}>
            <Text>AudiConnect</Text>
            </ImageBackground>
        );
    }
}

export class MenuButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress = {this.props.onPress} >
            <ImageBackground source={require('../../assets/header.png')} style={{width: '100%', height: '100%'}}>
            <Image
            source={require('../../assets/menu.png')}
            resizeMode = "contain"
            style = {{width: 55, height: 35,marginTop:10}}/>
            </ImageBackground>
            </TouchableOpacity>
        );
    }
}