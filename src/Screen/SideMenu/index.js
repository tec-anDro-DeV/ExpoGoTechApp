import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ImageBackground, Dimensions, StatusBar } from 'react-native';
import styles from './style';
import Texts from '../../Component/Text/index';
import Color from '../../Config/Color';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    this._getdata();
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    //   this._getdata(); // Reload data every time the screen is focused
    // });
    // this._getdata(); // Initial data load
  }

  // componentWillUnmount() {
  //   this._unsubscribe(); // Cleanup the event listener
  // }

  _getdata = async () => {
    console.log('enter get data');
    const user = await AsyncStorage.getItem('userName');
    this.setState({ username: user });
  };

  logout() {
    this._logout();
  }

  _logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('orders_local_3');
      await AsyncStorage.removeItem('current_params'); // Add any other keys that need to be
    } catch (exception) {
      console.log('Error clearing AsyncStorage:', exception);
    }
    this.props.navigation.navigate('Auth');
  };

  ratingCompleted(rating) {
    console.log(rating);
  }
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {/* <StatusBar barStyle="light-content" /> */}
        <ScrollView>
          <View style={{ flex: 1 }}>
            {/* <ImageBackground
              source={require("../../Image/D_Rectangle.png")}
              style={{ height: height / 3.7 }}
            > */}
            <View
              style={{
                backgroundColor: '#727cf5',
                // borderBottomLeftRadius: 50,
                // borderBottomRightRadius: 100
              }}
            >
              <View
                style={[
                  {
                    //justifyContent:"center",
                    alignSelf: 'center',
                    flex: 1,
                    // marginRight:30,
                    marginTop: 20,
                    marginBottom: 20,
                  },
                ]}
              >
                <View style={{ alignSelf: 'center' }}>
                  <Text
                    style={[
                      {
                        color: '#fff',
                        fontSize: 18,
                        textAlign: 'center',
                        fontFamily: 'uber',
                      },
                    ]}
                  >
                    {this.state.username}
                  </Text>
                </View>
              </View>
            </View>
            {/* </ImageBackground> */}
            <View
              style={{
                marginHorizontal: 15,
                marginTop: 10,
                backgroundColor: '#fff',
              }}
            >
              <TouchableOpacity onPress={() => this.logout()}>
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image source={require('../../Image/logout.png')} style={styles.image} />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text='Logout' extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.07, width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: height - 200 }}>
              <Text style={{ textAlign: 'center' }}>V 1.21</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
