import React from "react";
import { Image, ImageBackground,View } from 'react-native';
import { createBottomTabNavigator, BottomTabBar} from "react-navigation-tabs";
import { HomeNavigator,SearchNavigator,PostNavigator,ProfileNavigator,TrendingPostsNavigator} from "./screen-stack-navigators";

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    Search: SearchNavigator,
    Post: PostNavigator,
    Profile: ProfileNavigator,
    Trending: TrendingPostsNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            <Image
              source={
                focused
                  ? require('../assets/home_icon.png')
                  : require('../assets/home_icon.png')
              }
              style={{
                width: 25,
                height: 25,
              }}
            />
          );
        } else if (routeName === 'Search') {
          return (
            <Image
              source={
                focused
                  ? require('../assets/search_icon.png')
                  : require('../assets/search_icon.png')
              }
              style={{
                width: 25,
                height: 25,
              }}
            />
          );
        }
        else if (routeName === 'Post') {
          return (
            <Image
              source={
                focused
                  ? require('../assets//post_icon.png')
                  : require('../assets/post_icon.png')
              }
              style={{
                width: 25,
                height: 25,
              }}
            />
          );
        }else if (routeName === 'Profile') {
          return (
           
            <Image
              source={
                focused
                  ? require('../assets/profile_icon.png')
                  : require('../assets/profile_icon.png')
              }
              style={{
                width: 25,
                height: 25,
              }}  
            />
          );
        }else if (routeName === 'Trending') {
          return (
            <Image
              source={
                focused
                  ? require('../assets/trending.png')
                  : require('../assets/trending.png')
              }
              style={{
                width: 25,
                height: 25,
              }}  
            />
          );
        }
      },
      
    }),
    tabBarOptions: {
      style: {
        backgroundColor: '#42a5f5',
        height:60
      },
      activeTintColor: 'white',
      inactiveTintColor: 'black',
    },
  }
);

export default BottomTabNavigator;
