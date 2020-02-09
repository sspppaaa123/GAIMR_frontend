import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";
import { ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import LikeButton from '../components/LikeButton'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const users = [
  {
     id: '1',
     title: 'Coco Cola Cool Advt',
     info: 'Hey! Grab a Cola and get 50% cashback',
     avatar: require('../assets/cococola.jpg'),
     
  },
  {
    id: '2',
    title: 'Maggi Advt',
    info: 'Buy 1 get 1 Freeeee',
    avatar: require('../assets/maggi.jpg'),
    
 },
 {
  id: '3',
  title: 'GoodDay Advt',
  info: 'Have a good day!',
  avatar: require('../assets/goodday.png'),
  
},
{
  id: '4',
  title: 'Ind vs NZ',
  info: 'Who is winning today??',
  avatar: require('../assets/match.jpg'),
  
},
{
  id: '5',
  title: 'CoronaVirus',
  info: 'Pls be careful! Take more of Vitamin C.',
  avatar: require('../assets/corona.jpg'),
  
},
  
 ];

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: ()=><MenuButton onPress={() => navigation.openDrawer()} />,
      headerRight:()=> (<Logo />),
    };
  };

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.info}>CDAR - Chennai</Text>
              <View style={styles.followContainer}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>150 Followers</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>200 Following</Text> 
              </TouchableOpacity>
              </View>
            </View>
            </View>
            <ScrollView style={styles.scrollstyle}>
                  {users.map((u,index) => {
                      return (
                      <Card key={index}>
                        <View key={index} style={styles.user}>
                                <Image
                                  style={styles.avatar_card}
                                  resizeMode="cover"
                                  source={ u.avatar }
                                />
                                <Text style={styles.name}>{u.title}</Text>
                                <Text style={styles.infostyle}>{u.info}</Text>
                                <LikeButton />
                              </View>
                      </Card>);
                  })}
            </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center'
  },
  header:{
    // marginTop: 10,
    backgroundColor: "#00BFFF",
    height:100,
    width:'100%',
    borderColor: "black",
    borderWidth: 2,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft:5,
    marginRight: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 3,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'flex-start',
    position: 'absolute',
    marginTop:10,
    marginLeft:5
  },
  avatar_card: {
    width: 350,
    height: 300,
    // borderRadius: 63,
    padding: 10,
    borderWidth: 2,
    borderColor: "black",
    marginBottom:20,
    alignSelf:'center',
    // position: 'absolute',
    marginLeft:5
  },
  bodyContent: {
    flex: 1,
    alignItems: 'flex-end',
    padding:5,
    marginRight:10,
    marginBottom: 10
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#FFFFFF",
  },
  buttonContainer: {
      height:30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:10,
      width:100,
      borderRadius:15,
      backgroundColor: "white",
      paddingRight:5,
      paddingLeft: 5
  },
  followContainer: {
    flexDirection: 'row',
},

});