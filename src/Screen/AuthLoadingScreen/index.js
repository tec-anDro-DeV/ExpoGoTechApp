import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrap();
  }

  async componentDidMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    } catch (e) {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
