import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, KeyboardAvoidingView, TouchableOpacity, StatusBar, TextInput, SafeAreaView } from 'react-native';
import container from '../../Styles/Container/style';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import { Tab, Tabs } from 'native-base';
import Button from '../../Component/Button/index';
import Tab1 from './signUp';
import Tab2 from './signIn';
import Color from '../../Config/Color';
import style from './style';
import API from '../../utils/api';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class componentName extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      spinner: false,
      error: false,
      modal_validate: false,
      visible_modal: false,
      text_modal: 'Loading...',
    };

    this._signInHandler = this._signInHandler.bind(this);
  }

  _signInHandler = async () => {
    const { username, password } = this.state;
    this.setState({ text_modal: 'Loading...' });
    this.setState({ visible_modal: true });

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    this.setState({ spinner: true });

    const response = true;

    console.log(response);
    console.log(username);
    let data_response = await API.valLogin(username, password);
    console.log(data_response);
    if (data_response.message == 'invalid_login') {
      //await Alert.alert('Error', data_response.message);
      this.setState({ spinner: false });
      this.setState({
        modal_validate: true,
      });
    } else {
      console.log('enter in access');
      await AsyncStorage.setItem('userToken', data_response.user_token);
      await AsyncStorage.setItem('userName', data_response.name);
      await AsyncStorage.setItem('user_id', data_response.user_id);
      await AsyncStorage.setItem('tech_connected', 'true');
      let new_params = {
        update: '1',
      };
      await AsyncStorage.setItem('current_params', JSON.stringify(new_params));
      this.props.navigation.navigate('App');
    }
    /*
        await AsyncStorage.setItem('userToken', "djfhdufh");
        await AsyncStorage.setItem('userName', "name ");
        this.props.navigation.navigate('App');
    */
    this.setState({ visible_modal: false });
  };

  cancel_validate = async () => {
    this.setState({
      modal_validate: false,
    });
  };
  render() {
    return (
      <SafeAreaView style={[container.container]}>
        <View style={{ flex: 0.5 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: width, height: height / 2.2 }}></View>
          <View
            style={{
              marginHorizontal: 20,
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              margin: 10,
            }}
          ></View>
        </View>

        <Modal animationType='slide' transparent={true} visible={this.state.modal_validate}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 300,
                height: 150,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
              }}
            >
              <Image
                source={require('../../Image/priority1.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 8,
                }}
              />
              <Text style={{ textAlign: 'center', marginTop: 10 }}>Incorrect Credentials. Try again or contact administrator to reset.</Text>
              <Button Text='Close' onPress={this.cancel_validate} textStyle={{ fontFamily: 'uber', fontSize: 16 }} viewStyle={{ marginBottom: 20 }} />
            </View>
          </View>
        </Modal>

        <View style={style.cardView}>
          <View style={{ margin: 10 }}>
            <Tabs
              tabBarUnderlineStyle={{
                backgroundColor: Color.steel,
                borderRadius: 130,
              }}
              tabContainerStyle={{
                elevation: 0,
                borderBottomColor: Color.white,
              }}
            >
              <Tab
                activeTabStyle={{ backgroundColor: Color.white }}
                heading='Sign In'
                activeTextStyle={{
                  color: Color.black,
                  fontSize: 20,
                  fontFamily: 'uber',
                }}
                tabStyle={{ backgroundColor: Color.white }}
                textStyle={{
                  color: Color.steel,
                  fontSize: 20,
                  fontFamily: 'uber',
                }}
              >
                <KeyboardAvoidingView>
                  <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                    <TextInput
                      style={{
                        borderColor: Color.steel,
                        borderWidth: 0.5,
                        borderRadius: 5,
                        fontSize: 18,
                        marginVertical: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 7,
                        fontFamily: 'uber-r',
                      }}
                      placeholderTextColor={Color.steel}
                      onChangeText={(username) => this.setState({ username })}
                      placeholder='Username'
                      underlineColorAndroid={'transparent'}
                      autoCapitalize='none'
                    />

                    <TextInput
                      style={{
                        borderColor: Color.steel,
                        borderWidth: 0.5,
                        borderRadius: 5,
                        fontSize: 18,
                        marginVertical: 10,
                        paddingHorizontal: 15,
                        paddingVertical: 7,
                        fontFamily: 'uber-r',
                      }}
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({ password })}
                      placeholderTextColor={Color.steel}
                      placeholder='Password'
                      underlineColorAndroid={'transparent'}
                      autoCapitalize='none'
                    />
                  </View>
                  {this.state.error && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'center' }}>
                      <Text style={{ fontFamily: 'Roboto', width: '100%', color: 'red', justifyContent: 'center', alignItems: 'center', width: '100%', textAlign: 'center' }}>
                        Incorrect Login Credentials
                      </Text>
                    </View>
                  )}
                </KeyboardAvoidingView>
                <Button
                  Text='Login'
                  textStyle={{ fontFamily: 'Roboto', fontSize: 16 }}
                  viewStyle={{ marginBottom: 20, backgroundColor: '#727cf5' }}
                  onPress={this._signInHandler}
                />
              </Tab>
            </Tabs>
          </View>
        </View>
        <Modal animationType='slide' transparent={true} visible={this.state.visible_modal}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 300,
                height: 150,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
              }}
            >
              <Text style={{ textAlign: 'center', marginTop: 10 }}>{this.state.text_modal}</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
