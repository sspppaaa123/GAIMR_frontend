import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import TrendingPostsScreen from "../screens/TrendingPostsScreen";

//Add navigators with screens in this file
export const HomeNavigator = createStackNavigator({
  Home: { screen: HomeScreen }
});

export const SearchNavigator = createStackNavigator({
  Search: { screen: SearchScreen }
});

export const ProfileNavigator = createStackNavigator({
  Profile: { screen: ProfileScreen }
});

export const PostNavigator = createStackNavigator({
  Post: { screen: PostScreen }
});

export const TrendingPostsNavigator = createStackNavigator({
  Post: { screen: TrendingPostsScreen }
});
