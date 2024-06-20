import "react-native-gesture-handler";
import React, { Component } from 'react'
import Navigation from './src/Navigation/index'
//import {AppLoading } from "expo-app-loading";
import * as Font from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      "uber": require("./assets/fonts/OpenSans-Regular.ttf"),
      "uber-l": require("./assets/fonts/UberMoveText-Light.ttf"),
      "uber-r": require("./assets/fonts/UberMoveText-Regular.ttf"),
      "uber-b": require("./assets/fonts/UberMoveText-Bold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }
  render() {

    return (
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    );

  }
}
