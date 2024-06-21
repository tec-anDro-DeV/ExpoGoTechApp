import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import styles from './style';
import { Image, Text, View, TextInput, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import { Drawer, Icon, Col, Right } from 'native-base';
import SideBar from '../../Screen/SideMenu/index';
import Container from '../../Styles/Container/style';
import IconText from '../../Component/Icon2Text/index';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../utils/api';
import Constants from 'expo-constants';
import Button from '../../Component/Button/index';
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import getDirections from 'react-native-google-maps-directions';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const marker_image = require('../../../assets/graffiti_icon.png');
const selectedMarker = require('../../../assets/graffiti_icon_selected.png');

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      props: props,
      name: '',
      count: 0,
      order_id: '',
      street: '',
      city: '',
      duration: '',
      distance: '',
      location: '',
      forceRefresh: '',
      des_lat: '',
      des_log: '',
      reload: false,
      username: '',
      tech_connected: '',
      selectedMarkerIndex: 0,
      new_params: [],
      visible_modal: false,
      visible_modal2: false,
      text_modal: 'Updating ...',
    };
    this.state = {
      markers: [],
    };
  }

  handleGetDirections = () => {
    const data = {
      source: {
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
      },
      destination: {
        latitude: this.state.des_lat,
        longitude: this.state.des_log,
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving', // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: 'dir_action',
          value: 'navigate', // this instantly initializes navigation using the given travel mode
        },
      ],
    };
    //console.log(data);
    getDirections(data);
  };

  async componentDidMount() {
    let new_params = await AsyncStorage.getItem('current_params');
    new_params = JSON.parse(new_params);
    this.setState({ new_params: new_params });

    //this.firebase_func();

    //console.log('hi2');
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    //console.log("enter");

    // this._getOrders();
    this.set_page();

    const { navigation } = this.props;
    this.setState({ markers: this.props.route.params.markers });
    const tech_connected_ = await AsyncStorage.getItem('tech_connected');
    this.setState({ tech_connected: tech_connected_ });

    const user = await AsyncStorage.getItem('userName');
    this.setState({ username: user });
    this.focusListener = navigation.addListener('focus', async () => {
      let new_params = await AsyncStorage.getItem('current_params');
      new_params = JSON.parse(new_params);
      this.setState({ new_params: new_params });

      this.set_page();
      //const { params } = this.props.navigation.state;

      if (this.state.new_params) {
        if (this.state.new_params.update == '1') {
          // this._getOrders();
          this.setState({
            forceRefresh: Math.floor(Math.random() * 100),
            duration: false,
          });
        }

        this.props.navigation.setParams({ update: '0' });
      }
    });
  }

  firebase_func = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    firebase
      .database()
      .ref('tech/' + user_id)
      .on('value', (data) => {
        //this._getOrders();
        this.setState({
          forceRefresh: Math.floor(Math.random() * 100),
          duration: false,
        });
      });
  };

  set_page = async () => {
    await AsyncStorage.setItem('page', 'map');
  };

  // _getOrders = async () => {
  //   //console.log("test1");
  //   this.setState({ text_modal: 'Updating ...' });
  //   this.setState({ visible_modal: true });
  //   const tech_connected_ = await AsyncStorage.getItem('tech_connected');
  //   this.setState({ tech_connected: tech_connected_ });

  //   const user = await AsyncStorage.getItem('userName');
  //   this.setState({ username: user });

  //   const user_id = await AsyncStorage.getItem('user_id');
  //   const token = await AsyncStorage.getItem('userToken');
  //   let data_response = await API.get_orders2(user_id, token, 0, 0);
  //   //console.log("test");
  //   //console.log(user_id);
  //   //console.log(token);
  //   //console.log(data_response);

  //   let a;
  //   a = this.state.markers.splice();
  //   let i = 0;
  //   if (data_response.orders) {
  //     for (let userObject of data_response.orders) {
  //       //console.log(userObject.address);

  //       a[i] = {
  //         title: userObject.address,
  //         order_id: userObject.order_id,
  //         street: userObject.street,
  //         city: userObject.city,
  //         coordinates: {
  //           latitude: Number(userObject.address_lat),
  //           longitude: Number(userObject.address_long),
  //         },
  //       };
  //       i++;
  //     }
  //   }

  //   this.setState({ markers: a });

  //   //console.log(a);
  //   this.setState({ visible_modal: false });
  // };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      //console.log("here");
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    // console.log(location);
  };

  onMarkerPress = async (order_id, street, city, des_latitude, des_longitude, key_order) => {
    this.setState({ order_id: order_id });
    this.setState({ key_order: key_order });
    this.setState({ selectedMarkerIndex: order_id });
    this.setState({ street: street });
    this.setState({ city: city });
    this.setState({ des_lat: des_latitude });
    this.setState({ des_log: des_longitude });

    try {
      let origin = this.state.location.coords.latitude + ',' + this.state.location.coords.longitude;
      let destination = des_latitude + ',' + des_longitude;
      let resp = await fetch('https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyBGkMG-nj0pgK1ruZRZUdLW-7SgSkmqQfQ&origin=' + origin + '&destination=' + destination);
      // console.log('https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyBGkMG-nj0pgK1ruZRZUdLW-7SgSkmqQfQ&origin='+origin+'&destination='+destination);
      let respJson = await resp.json();
      this.setState({ duration: respJson.routes[0].legs[0].duration.text });
      this.setState({ distance: respJson.routes[0].legs[0].distance.text });
    } catch (error) {}
  };

  open_details = async () => {
    //alert("test");
    //this._getOrders();
    /*
    this.setState({
        forceRefresh: Math.floor(Math.random() * 100),
        duration : false,
    })
    */
    /*
    let order_id = this.state.order_id;
    this.props.navigation.navigate('Details', {
      order_id: order_id,
      page: "map"
    });
*/

    let order_id = this.state.order_id;

    let order_key = this.state.order_key;
    let new_params = {
      order_id: order_id,
      key_order: order_key,
      type_order: 'open',
      page: 'map',
    };

    await AsyncStorage.setItem('current_params', JSON.stringify(new_params));

    this.props.navigation.navigate('Details', {
      order_id: order_id,
      page: 'map',
    });
  };

  open_new = async () => {
    this.props.navigation.navigate('New');
  };

  open_list = async () => {
    this.props.navigation.navigate('List');
  };

  _gotoCurrentLocation = () => {
    this.map.animateToRegion({
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  onMapPress = () => {
    this.setState({ duration: false });
    this.setState({ selectedMarkerIndex: 0 });
  };

  disconnect_user = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    firebase
      .database()
      .ref('tech_connected/' + user_id)
      .set({ connected: 'fasle', user_id: user_id });

    await AsyncStorage.setItem('tech_connected', 'false');
    this.setState({ tech_connected: 'false' });
  };

  connect_user = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    firebase
      .database()
      .ref('tech_connected/' + user_id)
      .set({ connected: 'true', user_id: user_id });

    await AsyncStorage.setItem('tech_connected', 'true');
    this.setState({ tech_connected: 'true' });
  };

  render() {
    return (
      <SafeAreaView style={Container.container}>
        <Drawer
          ref={(ref) => {
            this.drawer = ref;
          }}
          content={<SideBar navigation={this.props.navigation} />}
          onClose={() => this.drawer._root.close()}
        >
          <MapView
            key={this.state.forceRefresh}
            style={{ flex: 1 }}
            showsMyLocationButton
            showsUserLocation
            onPress={() => {
              this.onMapPress();
            }}
            ref={(ref) => (this.map = ref)}
            initialRegion={{
              latitude: 33.9361293,
              longitude: -117.94437340000002,
              latitudeDelta: 0.3,
              longitudeDelta: 0.3,
            }}
          >
            {this.state.markers.map((marker, key) => (
              <Marker
                key={marker.order_id}
                coordinate={marker.coordinates}
                onPress={() => {
                  this.onMarkerPress(marker.order_id, marker.street, marker.city, marker.coordinates.latitude, marker.coordinates.longitude, key);
                }}
              >
                <Image source={this.state.selectedMarkerIndex === marker.order_id ? selectedMarker : marker_image} style={{ height: 31, width: 22 }} />
              </Marker>
            ))}
          </MapView>
          <View
            style={{
              marginTop: 40,
              position: 'absolute',
              flex: 1,
              marginLeft: 15,
              ...Platform.select({
                ios: {
                  zIndex: 9,
                },
              }),
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
              }}
              onPress={() => this.drawer._root.open()}
            >
              <Image
                source={require('../../Image/menu.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 100,
              position: 'absolute',
              flex: 1,
              marginLeft: 15,
              ...Platform.select({
                ios: {
                  zIndex: 9,
                },
              }),
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
              }}
              onPress={() => {
                this.open_list();
              }}
            >
              <Image
                source={require('../../Image/menu_4.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 160,
              position: 'absolute',
              flex: 1,
              marginLeft: 15,
              ...Platform.select({
                ios: {
                  zIndex: 9,
                },
              }),
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
              }}
              onPress={() => {
                this.open_new();
              }}
            >
              <Image
                source={require('../../Image/menu_3.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
          </View>
          {this.state.tech_connected == 'true' && (
            <View
              style={{
                marginTop: 220,
                position: 'absolute',
                flex: 1,
                marginLeft: 15,
                ...Platform.select({
                  ios: {
                    zIndex: 9,
                  },
                }),
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                }}
                onPress={() => {
                  this.disconnect_user();
                }}
              >
                <Image
                  source={require('../../Image/btn_on.png')}
                  style={{
                    width: 55,
                    height: 55,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          {this.state.tech_connected == 'false' && (
            <View
              style={{
                marginTop: 220,
                position: 'absolute',
                flex: 1,
                marginLeft: 15,
                ...Platform.select({
                  ios: {
                    zIndex: 9,
                  },
                }),
              }}
            >
              <TouchableOpacity
                style={{
                  position: 'absolute',
                }}
                onPress={() => {
                  this.connect_user();
                }}
              >
                <Image
                  source={require('../../Image/btn_off.png')}
                  style={{
                    width: 55,
                    height: 55,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={{
              marginTop: 280,
              position: 'absolute',
              flex: 1,
              marginLeft: 15,
              ...Platform.select({
                ios: {
                  zIndex: 9,
                },
              }),
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
              }}
              onPress={() => this._gotoCurrentLocation()}
            >
              <Image
                source={require('../../Image/menu_2.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
          </View>
          {!this.state.duration && (
            <View
              style={{
                flex: 0.07,
                width: '100%',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}
            >
              <Image
                source={require('../../Image/person2.png')}
                style={{
                  height: 19,
                  width: 19,
                  marginHorizontal: 7,
                }}
              />
              <Text style={{ textAlign: 'center' }}>{this.state.username}</Text>
            </View>
          )}
          {this.state.duration && (
            <View>
              <View style={styles.subContainerView}>
                <TouchableOpacity
                  style={{ margin: 15 }}
                  onPress={() => {
                    this.open_details();
                  }}
                >
                  {/* first row */}
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginVertical: 0 }}>
                      <View
                        style={{
                          alignSelf: 'center',
                          flexDirection: 'row',
                          marginHorizontal: 2,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.open_details();
                          }}
                        >
                          <View
                            style={{
                              justifyContent: 'center',
                              paddingBottom: 7,
                              paddingTop: 3,
                            }}
                          >
                            <Image
                              source={require('../../Image/up.png')}
                              style={{
                                width: 89,
                                height: 16,
                                transform: [{ scaleY: -1 }],
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {/* profile name */}
                    <View style={styles.textProfileView}>
                      <Text style={styles.textProfile}>{this.state.street}</Text>
                      <Text style={[styles.titleText, { marginHorizontal: 5, fontSize: 14 }]}>{this.state.city}</Text>
                    </View>
                    {/* msg,call */}
                  </View>
                  {/* 3rd row */}
                  <View style={styles.view}>
                    <View style={styles.optionView}>
                      <Image source={require('../../Image/car.png')} style={styles.image} />
                    </View>
                    <View style={styles.optionView}>
                      <Text style={styles.titleText2}>DISTANCE</Text>
                      <Text style={styles.text}>{this.state.distance}</Text>
                    </View>
                    <View style={styles.optionView}>
                      <Text style={styles.titleText2}>TIME</Text>
                      <Text style={styles.text}>{this.state.duration}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <Button
                  Text='Start Navigation'
                  onPress={this.handleGetDirections}
                  textStyle={{ fontFamily: 'Roboto', fontSize: 16 }}
                  viewStyle={{ marginBottom: 20, backgroundColor: '#4385F4' }}
                />
                {/* Alert Dialog */}
              </View>
            </View>
          )}
        </Drawer>
        {/* <Modal animationType='slide' transparent={true} visible={this.state.visible_modal}>
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
        </Modal> */}
      </SafeAreaView>
    );
  }
}
