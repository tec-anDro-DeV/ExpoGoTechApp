import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, TextInput, Dimensions, ScrollView, StyleSheet, BackHandler } from 'react-native';
import MapView from 'react-native-maps';
import container from '../../Styles/Container/style';
import API from '../../utils/api';
import styles from './style';
import Button from '../../Component/Button/index';
import Header from '../../Component/Header/index';
import Geocoder from 'react-native-geocoding';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { withOrientation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

Geocoder.init('AIzaSyBGkMG-nj0pgK1ruZRZUdLW-7SgSkmqQfQ', { language: 'en' });

export default class componentName extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      contracts: [],
      zones: [],
      latitune_new: '',
      longitude_new: '',
      new_zone: '',
      location: '',
      new_contract: '',
      showPlacesList: false,
      region: {
        latitude: -100,
        longitude: 0,
        latitudeDelta: 10,
        longitudeDelta: 10,
      },
      marker: {
        latitude: 0,
        longitude: -100,
      },
      map_h: 0,
      map_w: 0,
      con1_h: 0,
      con1_w: 0,
      header_h: 0,
      header_w: 0,
      new_address: '',
      map_latitude: 0,
      map_longitude: 0,
      title_page: '',
      type_map: 'standard',
      new_params: [],
    };
  }

  back = async () => {
    // const { params } = this.props.navigation.state;
    if (this.state.new_params.page == 'new') {
      let new_params = {};
      await AsyncStorage.setItem('current_params', JSON.stringify(new_params));
      this.props.navigation.navigate('New');
    }
    if (this.state.new_params.page == 'details') {
      let new_params = {
        order_id: this.state.new_params.order_id,
      };
      await AsyncStorage.setItem('current_params', JSON.stringify(new_params));
      this.props.navigation.navigate('Details', {
        order_id: this.state.new_params.order_id,
      });
    }
  };

  async componentDidMount() {
    BackHandler.addEventListener('backPress', this.handleBackButton);

    let new_params = await AsyncStorage.getItem('current_params');
    new_params = JSON.parse(new_params);
    this.setState({ new_params: new_params });

    console.log('hi1');
    //this._getLocationAsync();
    this._getData();

    //const { params } = this.props.navigation.state;
    if (this.state.new_params.page == 'new') {
      this.setState({
        title_page: 'New Work Order',
      });
    }
    if (this.state.new_params.page == 'details') {
      this.setState({
        title_page: 'Edit Work Order',
      });
      this.setState({ map_latitude: parseFloat(this.state.new_params.lat), map_longitude: parseFloat(this.state.new_params.long) });
    }

    this._getLocationAsync(this.state.new_params.page);
  }

  handleBackButton() {
    BackHandler.exitApp();
    return true;
  }

  _getLocationAsync = async (page) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('here');
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    if (page == 'new') {
      this.setState({ map_latitude: location.coords.latitude, map_longitude: location.coords.longitude });
    }

    console.log('location: ');
    console.log(location);

    this.setState({
      forceRefresh: Math.floor(Math.random() * 100),
    });
  };

  get_zone(value) {
    this.setState({
      latitune_new: value.geometry.location.lat,
      longitude_new: value.geometry.location.lng,
    });
    this._get_zone_2();
  }

  _get_zone_2 = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    console.log('enter here 2');
    let data_response = await API.get_zone_new_order(user_id, token, this.state.latitune_new, this.state.longitude_new);
    console.log(data_response);
    if (data_response.zone_id != '') {
      this.setState({
        new_zone: data_response.zone_id,
        new_contract: data_response.contract_id,
      });
    }
  };

  _getData = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    console.log('enter here');
    let data_response = await API.get_info_new_order(user_id, token);
    console.log(data_response);
    if (data_response.message == 'invalid_login') {
    } else {
      console.log(data_response);
      this.setState({
        contracts: data_response.contracts,
        zones: data_response.zones,
      });
    }
  };

  onRegionChange = async (region) => {
    this.setState({
      new_address: 'Loading...',
    });

    console.log(region);
    this.setState({
      region,
      marker: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });

    let query = await Geocoder.from(region.latitude, region.longitude);
    console.log(query.results[0].formatted_address);

    this.setState({
      new_address: query.results[0].formatted_address,
    });
  };

  find_dimesions(layout) {
    const { x, y, width, height } = layout;
    console.log(x);
    console.log(y);
    console.log(width);
    console.log(height);
    this.setState({
      map_h: height,
      map_w: width,
    });
  }

  find_dimesions_cont1(layout) {
    const { x, y, width, height } = layout;
    console.log(x);
    console.log(y);
    console.log(width);
    console.log(height);
    this.setState({
      con1_h: height,
      con1_w: width,
    });
  }

  find_dimesions_header(layout) {
    const { x, y, width, height } = layout;
    console.log(x);
    console.log(y);
    console.log(width);
    console.log(height);
    this.setState({
      header_h: height,
      header_w: width,
    });
  }

  _gotoCurrentLocation = () => {
    this.map.animateToRegion({
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  set_location = async () => {
    //const { params } = this.props.navigation.state;
    if (this.state.new_params.page == 'new') {
      let new_params = {
        new_address: this.state.new_address,
        new_lat: this.state.marker.latitude,
        new_log: this.state.marker.longitude,
      };
      await AsyncStorage.setItem('current_params', JSON.stringify(new_params));

      this.props.navigation.navigate('New', {
        new_address: this.state.new_address,
        new_lat: this.state.marker.latitude,
        new_log: this.state.marker.longitude,
      });
    }
    if (this.state.new_params.page == 'details') {
      let new_params = {
        order_id: this.state.new_params.order_id,
        new_address: this.state.new_address,
        new_lat: this.state.marker.latitude,
        new_log: this.state.marker.longitude,
      };
      await AsyncStorage.setItem('current_params', JSON.stringify(new_params));

      this.props.navigation.navigate('Details', {
        order_id: this.state.new_params.order_id,
        new_address: this.state.new_address,
        new_lat: this.state.marker.latitude,
        new_log: this.state.marker.longitude,
      });
    }
  };

  change_type = async () => {
    this.setState({ type_map: 'standard' });
  };
  change_type_sat = async () => {
    this.setState({ type_map: 'satellite' });
  };

  render() {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <Header
          onLayout={(event) => {
            this.find_dimesions_header(event.nativeEvent.layout);
          }}
          title={this.state.title_page}
          onPress={() => this.back()}
        />

        <View
          onLayout={(event) => {
            this.find_dimesions_cont1(event.nativeEvent.layout);
          }}
          style={styles.container}
        >
          <View style={styles.subContainerView}>
            <View style={styles.subContainerView}>
              <Text
                numberOfLines={2}
                ellipsizeMode='tail'
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 7,
                  marginHorizontal: 15,
                  marginVertical: 15,
                  height: 50,
                }}
              >
                {this.state.new_address}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <MapView
            mapType={this.state.type_map}
            onLayout={(event) => {
              this.find_dimesions(event.nativeEvent.layout);
            }}
            key={this.state.forceRefresh}
            style={{ flex: 1 }}
            ref={(ref) => (this.map = ref)}
            onRegionChangeComplete={this.onRegionChange}
            initialRegion={{
              latitude: this.state.map_latitude,
              longitude: this.state.map_longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            showsUserLocation
          ></MapView>
          <Image
            style={{
              left: '50%',
              marginLeft: -20,
              marginTop: -45,
              height: 40,
              width: 40,
              position: 'absolute',
              top: '50%',
            }}
            source={require('../../../assets/graffiti_icon_4.png')}
          />
        </View>

        <View
          style={{
            marginTop: this.state.con1_h + this.state.header_h + hp('12'),
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
            onPress={() => this.change_type()}
          >
            <Image
              source={require('../../Image/menu_8.png')}
              style={{
                width: 55,
                height: 55,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: this.state.con1_h + this.state.header_h + hp('20'),
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
              this.change_type_sat();
            }}
          >
            <Image
              source={require('../../Image/menu_9.png')}
              style={{
                width: 55,
                height: 55,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: this.state.con1_h + this.state.header_h + hp('28'),
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

        <View style={styles.container}>
          <View style={styles.subContainerView}>
            <Button
              Text='Set Location'
              textStyle={{ fontFamily: 'Roboto', fontSize: 16 }}
              viewStyle={{ marginBottom: 20, backgroundColor: '#727cf5' }}
              onPress={() => {
                this.set_location();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
