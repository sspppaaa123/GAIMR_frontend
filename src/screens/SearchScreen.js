import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { MenuButton, Logo } from "../components/header/header";
import { ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { SearchBar } from 'react-native-elements'

const users = [
  {
     id: '1',
     name: 'Brynn',
     info: 'Chennai',
     avatar: require('../assets/img1.png'),
     
  },
  {
    id: '2',
    name: 'Janet',
    info: 'Hyderabad',
    avatar: require('../assets/img2.png'),
    
 },
 {
  id: '3',
  name: 'Harry',
  info: 'Pune',
  avatar: require('../assets/img3.png'),
  
},
{
  id: '4',
  name: 'Sam',
  info:'Delhi',
  avatar: require('../assets/img4.png'),
  
},
{
  id: '5',
  name: 'Kalya',
  info: 'Kolkata',
  avatar: require('../assets/img5.png'),
  
},
{
  id: '6',
  name: 'Lynn',
  info: 'Delhi',
  avatar: require('../assets/img6.png'),
  
},
{
  id: '7',
  name: 'John',
  info:'Chennai',
  avatar: require('../assets/img7.png'),
  
},
{
  id: '8',
  name: 'Peter',
  info:'Pune',
  avatar: require('../assets/img8.png'),
  
},
{
  id: '9',
  name: 'Ross',
  info:'Kolkata',
  avatar: require('../assets/img9.png'),
  
},
{
  id: '10',
  name: 'Gaber',
  info:'Mumbai',
  avatar: require('../assets/img10.png'),
  
},

 ];

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: ()=><MenuButton onPress={() => navigation.openDrawer()} />,
      headerRight:()=> (<Logo />),
    };
  };

  render() {
    return (
      <View>
      <SearchBar 
      ref="searchBar" 
      placeholder="Search"
      inputContainerStyle={{backgroundColor: 'white'}}
      containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
      />
      <ScrollView>
                  {users.map((u,index) => {
                      return (
                      <Card key={index} >
                        <View key={index} style={styles.user}>
                                <Image
                                  style={styles.avatar_card}
                                  resizeMode="cover"
                                  source={u.avatar }
                                />
                                <Text style={styles.namestyle}>{u.name}</Text>
                                <Text style={styles.infostyle}>{u.info}</Text>
                                <View style = {styles.buttonstyle}>
                                <TouchableOpacity>
                                  <Text style = {styles.textstyle}>Follow</Text>
                              </TouchableOpacity>
                              </View>
                              </View>
                      </Card>);
                  })}
            </ScrollView>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar_card: {
    width: 70,
    height: 70,
    borderRadius: 63,
    // padding: 10,
    borderWidth: 2,
    borderColor: "black",
    marginLeft:5
  },
  namestyle:{
    fontSize:30,
    color: "#696969",
    fontWeight: "bold"
  },
  infostyle:{
    fontSize:20,
    color: "#696969",
    fontWeight: "900"
  },
  user:
  {
    alignItems:'center',
  },
  textstyle:{
    fontSize:15,
    color: "black",
    alignSelf:'center'
  },
  buttonstyle:
  {
    backgroundColor: "#00BFFF",
    padding:10,
    width: 80,
    height: 40,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    justifyContent:'center',
    marginTop: 40
  },
});
