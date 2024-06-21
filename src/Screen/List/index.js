import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  ImageEditor,
  BackHandler,
  Linking,
  ActivityIndicator,
} from 'react-native';
import container from '../../Styles/Container/style';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import { Tab, Tabs, ScrollableTab, List, Drawer, Icon, Item, Content } from 'native-base';
import SideBar from '../../Screen/SideMenu/index';
import Button from '../../Component/Button/index';
import Color from '../../Config/Color';
import style from './style';
import API, { BASEURL } from '../../utils/api';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import * as firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class componentName extends Component {
  backAction = () => {
    this.back();
    return true;
  };

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      markers2: [],
      markers3: [],
      location: '',
      count_1: 0,
      count_2: 0,
      count_3: 0,
      username: '',
      tech_connected: '',
      is_conected: 'false',
      netInfo: '',
      visible_modal: false,
      visible_modal2: false,
      text_modal: 'Updating ...',
      current_open_key: -1,
      current_completed_key: -1,
      current_survey_key: -1,
      b_image: [],
      a_image: [],
      images_to_upload: [],
      current_updating: 0,
      new_order_id: 0,
      more_images: false,
      test: '',
      test2: '',
      new_params: [],
    };
  }
  async componentDidMount() {
    //BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    console.log('URL----------', BASEURL);
    BackHandler.addEventListener('backPress', this.handleBackButton);

    let new_params = await AsyncStorage.getItem('current_params');
    new_params = JSON.parse(new_params);
    this.setState({ new_params: new_params });

    let speed = 0;

    try {
      let downloadSizeInBits = 12000000;
      let startTime = new Date().getTime();
      await fetch(BASEURL);
      let endTime = new Date().getTime();
      let duration = (endTime - startTime) / 1000;
      speed = downloadSizeInBits / (1024 * 1024 * duration);
      this.setState({ test: speed });
    } catch (error) {
      this.setState({ test: 0 });
      // console.error(error);
    }
    speed = parseFloat(speed);

    await NetInfo.fetch().then((state) => {
      console.log('all info', state);
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      //this.setState({ test : JSON.stringify(state) });

      if (state.type != 'wifi') {
        if (speed > 0.8) {
          this.setState({ is_conected: state.isConnected.toString() });
        } else {
          this.setState({ is_conected: 'false' });
        }
      } else {
        this.setState({ is_conected: state.isConnected.toString() });
      }
    });

    this.firebase_func();

    this._getLocationAsync();
    this.set_page();

    const { navigation } = this.props;

    this.focusListener = navigation.addListener('focus', async () => {
      console.log('enter did Focus');

      let new_params = await AsyncStorage.getItem('current_params');
      new_params = JSON.parse(new_params);
      console.log(new_params);
      this.setState({ new_params: new_params });

      let speed = 0;

      try {
        let downloadSizeInBits = 12000000;
        let startTime = new Date().getTime();
        await fetch(BASEURL);
        let endTime = new Date().getTime();
        let duration = (endTime - startTime) / 1000;
        speed = downloadSizeInBits / (1024 * 1024 * duration);
        this.setState({ test: speed });
      } catch (error) {
        this.setState({ test: 0 });
        // console.error(error);
      }
      speed = parseFloat(speed);

      NetInfo.fetch().then((state) => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);

        // this.setState({ test : JSON.stringify(state) });

        if (state.type != 'wifi') {
          this.setState({ test2: 'enter 1' });
          if (speed > 0.8) {
            this.setState({ test2: 'enter 2' + state.isConnected.toString() });
            this.setState({ is_conected: state.isConnected.toString() });
          } else {
            this.setState({ is_conected: 'false' });
          }
        } else {
          this.setState({ is_conected: state.isConnected.toString() });
        }

        // this._getOrders();
      });

      this.set_btn();
      this.set_page();
      // this.reload_orders('page');
      //const { params } = this.props.navigation.state;
      if (this.state.new_params) {
        if (this.state.new_params.update == '1') {
          this._getLocationAsync();
          this.reload_orders('page');
        }

        this.props.navigation.setParams({ update: '0' });
      }
    });
  }

  handleBackButton() {
    //
    BackHandler.exitApp();
    return true;
  }

  set_btn = async () => {
    const tech_connected_ = await AsyncStorage.getItem('tech_connected');
    this.setState({ tech_connected: tech_connected_ });
  };

  firebase_func = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: 'AIzaSyDlrejmHgOm7Cxy9l_F0B7M2V1IkyEtN2Q',
        authDomain: 'urban-3c6d8.firebaseapp.com',
        databaseURL: 'https://urban-3c6d8.firebaseio.com',
        projectId: 'urban-3c6d8',
        storageBucket: 'urban-3c6d8.appspot.com',
        messagingSenderId: '1010644563757',
        appId: '1:1010644563757:web:4bd922a5833d8cf3c785a4',
        measurementId: 'G-V5SE985CD6',
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }

    const tech_connected_ = await AsyncStorage.getItem('tech_connected');
    if (tech_connected_ == 'true') {
      firebase
        .database()
        .ref('tech_connected/' + user_id)
        .set({ connected: 'true', user_id: user_id });
    } else {
      firebase
        .database()
        .ref('tech_connected/' + user_id)
        .set({ connected: 'false', user_id: user_id });
    }

    firebase
      .database()
      .ref('tech/' + user_id)
      .on('value', (data) => {
        this._getOrders();
      });
  };

  componentWillUnmount() {
    //this.focusListener();
  }

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
    //console.log(location);

    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    let data_response_new_order = await API.get_info_new_order(user_id, token);
    let data_response_new_order_save = JSON.stringify(data_response_new_order);
    if (data_response_new_order_save != '') {
      await AsyncStorage.setItem('new_order_data', data_response_new_order_save);
    }

    this._getOrders();
  };

  back = async () => {
    let new_params = {};
    await AsyncStorage.setItem('current_params', JSON.stringify(new_params));
    this.props.navigation.navigate('Home');
  };
  set_page = async () => {
    await AsyncStorage.setItem('page', 'list');
  };

  reload_orders = async (action) => {
    let speed = 0;

    try {
      let downloadSizeInBits = 12000000;
      let startTime = new Date().getTime();
      await fetch(BASEURL);
      let endTime = new Date().getTime();
      let duration = (endTime - startTime) / 1000;
      speed = downloadSizeInBits / (1024 * 1024 * duration);
      this.setState({ test: speed });
    } catch (error) {
      this.setState({ test: 0 });
      // console.error(error);
    }
    speed = parseFloat(speed);

    await NetInfo.fetch().then((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      is_comm = false;

      if (state.type != 'wifi') {
        if (speed > 0.8) {
          this.setState({ is_conected: state.isConnected.toString() });
          is_comm = state.isConnected;
        } else {
          this.setState({ is_conected: 'false' });
          is_comm = false;
        }
      } else {
        this.setState({ is_conected: state.isConnected.toString() });
        is_comm = state.isConnected;
      }

      if (is_comm) {
        this._syng_data();
      } else {
        if (action == 'btn') {
          this.setState({ text_modal: 'No connection' });
          this.setState({ visible_modal2: true });
        }
      }
    });
  };

  _syng_data = async () => {
    let new_open = this.state.markers;

    const local_orders = await AsyncStorage.getItem('orders_local_3');
    orders_local = JSON.parse(local_orders);

    if (orders_local) {
      let order_open = Object.keys(orders_local.orders).length;

      if (order_open > 0) {
        let i = 0;
        for (let userObject of orders_local.orders) {
          console.log('enter here', i);
          console.log('enter here', userObject.sync_status);
          if (userObject.sync_status == 'new') {
            this.setState({ current_open_key: i });
            this.setState({ b_image: userObject.before_images_local });
            this.setState({ a_image: userObject.after_images_local });

            this.setState({
              more_images: false,
              images_to_upload: [],
            });

            const user_id = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('userToken');
            let data_response = await API.new_order(
              user_id,
              token,
              userObject.address,
              0,
              0,
              userObject.contract_id,
              userObject.zone_id,
              userObject.tech_status,
              userObject.new_notes,
              userObject.surface_id,
              userObject.service_id,
              userObject.square_footage,
              userObject.new_priority
            );
            console.log(data_response);
            if (data_response.message == 'invalid_login') {
            } else {
              this.setState({
                new_order_id: data_response.order_id,
              });
              let order_id_up = data_response.order_id;
              let correlative_n = 0;
              for (let before_image of this.state.b_image) {
                if (before_image.type == 'new') {
                  let new_object = {
                    route: before_image.route,
                    correlative: correlative_n,
                    type: 'before',
                  };

                  var joined = this.state.images_to_upload.concat(new_object);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }
              correlative_n = 0;
              for (let after_image of this.state.a_image) {
                if (after_image.type == 'new') {
                  let new_object2 = {
                    route: after_image.route,
                    correlative: correlative_n,
                    type: 'after',
                  };
                  var joined = this.state.images_to_upload.concat(new_object2);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }

              console.log(this.state.images_to_upload);
              if (this.state.images_to_upload.length > 0) {
                this.setState({
                  more_images: true,
                });
                for (let upload_ of this.state.images_to_upload) {
                  let user_id = await AsyncStorage.getItem('user_id');
                  let token = await AsyncStorage.getItem('userToken');
                  try {
                    let data_response = await API.upload_img(user_id, token, order_id_up, upload_.route, upload_.correlative, upload_.type);
                    console.log(data_response);
                  } catch (error) {}
                }
              } else {
                //this.information_save();
                //this.setState({ activity_indicator : false });
              }
            }

            orders_local.orders[i].sync_status = 'none';
            let local_order_save = JSON.stringify(orders_local);
            await AsyncStorage.setItem('orders_local_3', local_order_save);
          }
          if (userObject.sync_status == 'edit') {
            this.setState({ current_open_key: i });
            this.setState({ b_image: userObject.before_images_local });
            this.setState({ a_image: userObject.after_images_local });

            this.setState({
              more_images: false,
              images_to_upload: [],
            });

            const user_id = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('userToken');

            let data_response = await API.update_order(
              user_id,
              token,
              userObject.order_id,
              userObject.tech_status,
              userObject.surface_id,
              userObject.service_id,
              userObject.square_footage,
              userObject.notes,
              userObject.address,
              userObject.address_lat,
              userObject.address_long,
              userObject.contract_id,
              userObject.zone_id,
              userObject.priority
            );

            if (data_response.message == 'invalid_login') {
            } else {
              this.setState({
                new_order_id: userObject.order_id,
              });
              let order_id_up = userObject.order_id;
              let correlative_n = 0;
              for (let before_image of this.state.b_image) {
                if (before_image.type == 'new') {
                  let new_object = {
                    route: before_image.route,
                    correlative: correlative_n,
                    type: 'before',
                  };

                  var joined = this.state.images_to_upload.concat(new_object);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }
              correlative_n = 0;
              for (let after_image of this.state.a_image) {
                if (after_image.type == 'new') {
                  let new_object2 = {
                    route: after_image.route,
                    correlative: correlative_n,
                    type: 'after',
                  };
                  var joined = this.state.images_to_upload.concat(new_object2);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }

              console.log(this.state.images_to_upload);
              if (this.state.images_to_upload.length > 0) {
                this.setState({
                  more_images: true,
                });
                for (let upload_ of this.state.images_to_upload) {
                  let user_id = await AsyncStorage.getItem('user_id');
                  let token = await AsyncStorage.getItem('userToken');
                  try {
                    let data_response = await API.upload_img(user_id, token, order_id_up, upload_.route, upload_.correlative, upload_.type);
                    console.log(data_response);
                  } catch (error) {}
                }
              } else {
                //this.information_save();
                //this.setState({ activity_indicator : false });
              }
            }

            orders_local.orders[i].sync_status = 'none';
            let local_order_save = JSON.stringify(orders_local);
            await AsyncStorage.setItem('orders_local_3', local_order_save);
          }
          i++;
        }
        console.log('end here');
      }

      console.log('end here 2');

      let order_completed = Object.keys(orders_local.orders_completed).length;

      console.log(order_completed);

      if (order_completed > 0) {
        let i = 0;
        for (let userObject of orders_local.orders_completed) {
          console.log('enter here 2', i);
          if (userObject.sync_status == 'new') {
            this.setState({ current_completed_key: i });
            this.setState({ b_image: userObject.before_images_local });
            this.setState({ a_image: userObject.after_images_local });

            this.setState({
              more_images: false,
              images_to_upload: [],
            });

            const user_id = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('userToken');
            let data_response = await API.new_order(
              user_id,
              token,
              userObject.address,
              0,
              0,
              userObject.contract_id,
              userObject.zone_id,
              userObject.tech_status,
              userObject.new_notes,
              userObject.surface_id,
              userObject.service_id,
              userObject.square_footage,
              userObject.new_priority
            );
            console.log(data_response);
            if (data_response.message == 'invalid_login') {
            } else {
              this.setState({
                new_order_id: data_response.order_id,
              });
              let order_id_up = data_response.order_id;
              let correlative_n = 0;
              for (let before_image of this.state.b_image) {
                if (before_image.type == 'new') {
                  let new_object = {
                    route: before_image.route,
                    correlative: correlative_n,
                    type: 'before',
                  };

                  var joined = this.state.images_to_upload.concat(new_object);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }
              correlative_n = 0;
              for (let after_image of this.state.a_image) {
                if (after_image.type == 'new') {
                  let new_object2 = {
                    route: after_image.route,
                    correlative: correlative_n,
                    type: 'after',
                  };
                  var joined = this.state.images_to_upload.concat(new_object2);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }

              console.log(this.state.images_to_upload);
              if (this.state.images_to_upload.length > 0) {
                this.setState({
                  more_images: true,
                });
                for (let upload_ of this.state.images_to_upload) {
                  let user_id = await AsyncStorage.getItem('user_id');
                  let token = await AsyncStorage.getItem('userToken');
                  try {
                    let data_response = await API.upload_img(user_id, token, order_id_up, upload_.route, upload_.correlative, upload_.type);
                    console.log(data_response);
                  } catch (error) {}
                }
              } else {
                //this.information_save();
                //this.setState({ activity_indicator : false });
              }
            }

            orders_local.orders_completed[i].sync_status = 'none';
            let local_order_save = JSON.stringify(orders_local);
            await AsyncStorage.setItem('orders_local_3', local_order_save);
          }
          if (userObject.sync_status == 'edit') {
            this.setState({ current_completed_key: i });
            this.setState({ b_image: userObject.before_images_local });
            this.setState({ a_image: userObject.after_images_local });

            this.setState({
              more_images: false,
              images_to_upload: [],
            });

            console.log('enter here');

            const user_id = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('userToken');

            let data_response = await API.update_order(
              user_id,
              token,
              userObject.order_id,
              userObject.tech_status,
              userObject.surface_id,
              userObject.service_id,
              userObject.square_footage,
              userObject.notes,
              userObject.address,
              userObject.address_lat,
              userObject.address_long,
              userObject.contract_id,
              userObject.zone_id,
              userObject.priority
            );

            if (data_response.message == 'invalid_login') {
            } else {
              this.setState({
                new_order_id: userObject.order_id,
              });
              let order_id_up = userObject.order_id;
              let correlative_n = 0;
              for (let before_image of this.state.b_image) {
                if (before_image.type == 'new') {
                  let new_object = {
                    route: before_image.route,
                    correlative: correlative_n,
                    type: 'before',
                  };

                  var joined = this.state.images_to_upload.concat(new_object);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }
              correlative_n = 0;
              for (let after_image of this.state.a_image) {
                if (after_image.type == 'new') {
                  let new_object2 = {
                    route: after_image.route,
                    correlative: correlative_n,
                    type: 'after',
                  };
                  var joined = this.state.images_to_upload.concat(new_object2);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }

              console.log(this.state.images_to_upload);
              if (this.state.images_to_upload.length > 0) {
                this.setState({
                  more_images: true,
                });
                for (let upload_ of this.state.images_to_upload) {
                  let user_id = await AsyncStorage.getItem('user_id');
                  let token = await AsyncStorage.getItem('userToken');
                  try {
                    let data_response = await API.upload_img(user_id, token, order_id_up, upload_.route, upload_.correlative, upload_.type);
                    console.log(data_response);
                  } catch (error) {}
                }
              } else {
                //this.information_save();
                //this.setState({ activity_indicator : false });
              }
            }

            orders_local.orders_completed[i].sync_status = 'none';
            let local_order_save = JSON.stringify(orders_local);
            await AsyncStorage.setItem('orders_local_3', local_order_save);
          }
          i++;
        }
      }

      let order_survey = Object.keys(orders_local.orders_survey).length;

      if (order_survey > 0) {
        let i = 0;
        for (let userObject of orders_local.orders_survey) {
          if (userObject.sync_status == 'new') {
            this.setState({ current_survey_key: i });
            this.setState({ b_image: userObject.before_images_local });
            this.setState({ a_image: userObject.after_images_local });

            this.setState({
              more_images: false,
              images_to_upload: [],
            });

            const user_id = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('userToken');
            let data_response = await API.new_order(
              user_id,
              token,
              userObject.address,
              0,
              0,
              userObject.contract_id,
              userObject.zone_id,
              userObject.tech_status,
              userObject.new_notes,
              userObject.surface_id,
              userObject.service_id,
              userObject.square_footage,
              userObject.new_priority
            );
            console.log(data_response);
            if (data_response.message == 'invalid_login') {
            } else {
              this.setState({
                new_order_id: data_response.order_id,
              });
              let order_id_up = data_response.order_id;
              let correlative_n = 0;
              for (let before_image of this.state.b_image) {
                if (before_image.type == 'new') {
                  let new_object = {
                    route: before_image.route,
                    correlative: correlative_n,
                    type: 'before',
                  };

                  var joined = this.state.images_to_upload.concat(new_object);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }
              correlative_n = 0;
              for (let after_image of this.state.a_image) {
                if (after_image.type == 'new') {
                  let new_object2 = {
                    route: after_image.route,
                    correlative: correlative_n,
                    type: 'after',
                  };
                  var joined = this.state.images_to_upload.concat(new_object2);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }

              console.log(this.state.images_to_upload);
              if (this.state.images_to_upload.length > 0) {
                this.setState({
                  more_images: true,
                });
                for (let upload_ of this.state.images_to_upload) {
                  let user_id = await AsyncStorage.getItem('user_id');
                  let token = await AsyncStorage.getItem('userToken');
                  try {
                    let data_response = await API.upload_img(user_id, token, order_id_up, upload_.route, upload_.correlative, upload_.type);
                    console.log(data_response);
                  } catch (error) {}
                }
              } else {
                //this.information_save();
                //this.setState({ activity_indicator : false });
              }
            }

            orders_local.orders_survey[i].sync_status = 'none';
            let local_order_save = JSON.stringify(orders_local);
            await AsyncStorage.setItem('orders_local_3', local_order_save);
          }
          if (userObject.sync_status == 'edit') {
            this.setState({ current_survey_key: i });
            this.setState({ b_image: userObject.before_images_local });
            this.setState({ a_image: userObject.after_images_local });

            this.setState({
              more_images: false,
              images_to_upload: [],
            });

            const user_id = await AsyncStorage.getItem('user_id');
            const token = await AsyncStorage.getItem('userToken');

            let data_response = await API.update_order(
              user_id,
              token,
              userObject.order_id,
              userObject.tech_status,
              userObject.surface_id,
              userObject.service_id,
              userObject.square_footage,
              userObject.notes,
              userObject.address,
              userObject.address_lat,
              userObject.address_long,
              userObject.contract_id,
              userObject.zone_id,
              userObject.priority
            );

            if (data_response.message == 'invalid_login') {
            } else {
              this.setState({
                new_order_id: userObject.order_id,
              });
              let order_id_up = userObject.order_id;
              let correlative_n = 0;
              for (let before_image of this.state.b_image) {
                if (before_image.type == 'new') {
                  let new_object = {
                    route: before_image.route,
                    correlative: correlative_n,
                    type: 'before',
                  };

                  var joined = this.state.images_to_upload.concat(new_object);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }
              correlative_n = 0;
              for (let after_image of this.state.a_image) {
                if (after_image.type == 'new') {
                  let new_object2 = {
                    route: after_image.route,
                    correlative: correlative_n,
                    type: 'after',
                  };
                  var joined = this.state.images_to_upload.concat(new_object2);
                  this.setState({ images_to_upload: joined });
                }
                correlative_n++;
              }

              console.log(this.state.images_to_upload);
              if (this.state.images_to_upload.length > 0) {
                this.setState({
                  more_images: true,
                });
                for (let upload_ of this.state.images_to_upload) {
                  let user_id = await AsyncStorage.getItem('user_id');
                  let token = await AsyncStorage.getItem('userToken');
                  try {
                    let data_response = await API.upload_img(user_id, token, order_id_up, upload_.route, upload_.correlative, upload_.type);
                    console.log(data_response);
                  } catch (error) {}
                }
              } else {
                //this.information_save();
                //this.setState({ activity_indicator : false });
              }
            }

            orders_local.orders_survey[i].sync_status = 'none';
            let local_order_save = JSON.stringify(orders_local);
            await AsyncStorage.setItem('orders_local_3', local_order_save);
          }
          i++;
        }
      }
    }

    this.setState({
      current_open_key: -1,
      current_completed_key: -1,
      current_survey_key: -1,
    });
    this._getOrders_update();
  };

  upload_image = async () => {
    let count_images = this.state.images_to_upload.length;
    if (this.state.current_updating < count_images) {
      const user_id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('userToken');
      //const { params } = this.props.navigation.state;
      console.log(this.state.images_to_upload[this.state.current_updating].route);
      let data_response = await API.upload_img(
        user_id,
        token,
        this.state.new_order_id,
        this.state.images_to_upload[this.state.current_updating].route,
        this.state.images_to_upload[this.state.current_updating].correlative,
        this.state.images_to_upload[this.state.current_updating].type
      );
      console.log(data_response);
      if (data_response.message == 'successfully') {
        let new_img = this.state.current_updating + 1;
        this.setState({
          current_updating: new_img,
        });
        if (this.state.more_images) {
          await this.upload_image();
        }
      } else {
        console.log('error');
      }
    } else {
      this.setState({
        more_images: false,
        images_to_upload: [],
      });
      //this.information_save();
      //this.setState({ activity_indicator : false });
    }
  };

  _getOrders_update = async () => {
    this.setState({ text_modal: 'Updating ...' });
    this.setState({ visible_modal: true });

    const tech_connected_ = await AsyncStorage.getItem('tech_connected');
    this.setState({ tech_connected: tech_connected_ });

    const user = await AsyncStorage.getItem('userName');
    this.setState({ username: user });

    //console.log("test1");
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    const local_orders = await AsyncStorage.getItem('orders_local_3');

    //console.log('local:', local_orders);
    let data_response = '';

    try {
      console.log(user_id);
      data_response = await API.get_orders2(user_id, token, this.state.location.coords.latitude, this.state.location.coords.longitude);
      let local_order_save = JSON.stringify(data_response);
      await AsyncStorage.setItem('orders_local_3', local_order_save);
    } catch (e) {
      console.log('Error', e);
    }

    let data_response_new_order = await API.get_info_new_order(user_id, token);
    console.log('data for new:', data_response_new_order.zones);
    let data_response_new_order_save = JSON.stringify(data_response_new_order);
    if (data_response_new_order_save != '') {
      await AsyncStorage.setItem('new_order_data', data_response_new_order_save);
    }

    if (data_response) {
      console.log('yes');
    } else {
      console.log('no');
    }
    this.setState({ count_1: Object.keys(data_response.orders).length });
    if (this.state.count_1 > 0) {
      let a;
      a = this.state.markers.splice();
      let i = 0;
      for (let userObject of data_response.orders) {
        //console.log(userObject.address);

        a[i] = {
          title: userObject.address,
          order_id: userObject.order_id,
          priority: userObject.priority,
          code: userObject.contract_code,
          notes: userObject.notes,
          street: userObject.street,
          city: userObject.city,
          distance: userObject.distance,
          coordinates: {
            latitude: Number(userObject.address_lat),
            longitude: Number(userObject.address_long),
          },
        };
        i++;
      }
      this.setState({ markers: a });
    } else {
      this.setState({ markers: [] });
    }

    this.setState({ count_2: Object.keys(data_response.orders_completed).length });
    if (this.state.count_2 > 0) {
      let b;
      b = this.state.markers2.splice();
      i = 0;
      for (let userObject of data_response.orders_completed) {
        //console.log(userObject.address);

        b[i] = {
          title: userObject.address,
          order_id: userObject.order_id,
          code: userObject.contract_code,
          street: userObject.street,
          city: userObject.city,
          coordinates: {
            latitude: Number(userObject.address_lat),
            longitude: Number(userObject.address_long),
          },
        };
        i++;
      }
      this.setState({ markers2: b });
    } else {
      this.setState({ markers2: [] });
    }
    //console.log(b);

    this.setState({ count_3: Object.keys(data_response.orders_survey).length });

    if (this.state.count_3 > 0) {
      let c;
      c = this.state.markers3.splice();
      i = 0;
      for (let userObject of data_response.orders_survey) {
        //console.log(userObject.address);

        c[i] = {
          title: userObject.address,
          order_id: userObject.order_id,
          code: userObject.contract_code,
          street: userObject.street,
          city: userObject.city,
          coordinates: {
            latitude: Number(userObject.address_lat),
            longitude: Number(userObject.address_long),
          },
        };
        i++;
      }
      this.setState({ markers3: c });
    } else {
      this.setState({ markers3: [] });
    }
    //console.log(c);

    this.setState({ visible_modal: false });
  };

  _getOrders = async () => {
    this.setState({ text_modal: 'Updating ...' });
    this.setState({ visible_modal: true });
    const tech_connected_ = await AsyncStorage.getItem('tech_connected');
    this.setState({ tech_connected: tech_connected_ });

    const user = await AsyncStorage.getItem('userName');
    this.setState({ username: user });

    //console.log("test1");
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    const local_orders = await AsyncStorage.getItem('orders_local_3');

    //console.log('local:', local_orders);
    let data_response = '';
    if (local_orders == null) {
      data_response = await API.get_orders2(user_id, token, this.state.location.coords.latitude, this.state.location.coords.longitude);
      let local_order_save = JSON.stringify(data_response);
      await AsyncStorage.setItem('orders_local_3', local_order_save);
    } else {
      data_response = JSON.parse(local_orders);
      console.log('no, null');
    }

    if (data_response) {
      console.log('yes');
    } else {
      console.log('no');
    }
    this.setState({ count_1: Object.keys(data_response.orders).length });
    if (this.state.count_1 > 0) {
      let a;
      a = this.state.markers.splice();
      let i = 0;
      for (let userObject of data_response.orders) {
        //console.log(userObject.address);

        a[i] = {
          title: userObject.address,
          order_id: userObject.order_id,
          priority: userObject.priority,
          code: userObject.contract_code,
          notes: userObject.notes,
          street: userObject.street,
          city: userObject.city,
          distance: userObject.distance,
          coordinates: {
            latitude: Number(userObject.address_lat),
            longitude: Number(userObject.address_long),
          },
        };
        i++;
      }
      this.setState({ markers: a });
    } else {
      this.setState({ markers: [] });
    }

    this.setState({ count_2: Object.keys(data_response.orders_completed).length });
    if (this.state.count_2 > 0) {
      let b;
      b = this.state.markers2.splice();
      i = 0;
      for (let userObject of data_response.orders_completed) {
        //console.log(userObject.address);

        b[i] = {
          title: userObject.address,
          order_id: userObject.order_id,
          code: userObject.contract_code,
          street: userObject.street,
          city: userObject.city,
          coordinates: {
            latitude: Number(userObject.address_lat),
            longitude: Number(userObject.address_long),
          },
        };
        i++;
      }
      this.setState({ markers2: b });
    } else {
      this.setState({ markers2: [] });
    }
    //console.log(b);

    this.setState({ count_3: Object.keys(data_response.orders_survey).length });

    if (this.state.count_3 > 0) {
      let c;
      c = this.state.markers3.splice();
      i = 0;
      for (let userObject of data_response.orders_survey) {
        //console.log(userObject.address);

        c[i] = {
          title: userObject.address,
          order_id: userObject.order_id,
          code: userObject.contract_code,
          street: userObject.street,
          city: userObject.city,
          coordinates: {
            latitude: Number(userObject.address_lat),
            longitude: Number(userObject.address_long),
          },
        };
        i++;
      }
      this.setState({ markers3: c });
    } else {
      this.setState({ markers3: [] });
    }
    //console.log(c);
    this.setState({ visible_modal: false });
  };

  open_details = async (order_id, key_order, type_order) => {
    let new_params = {
      order_id: order_id,
      key_order: key_order,
      type_order: type_order,
      page: 'list',
    };

    await AsyncStorage.setItem('current_params', JSON.stringify(new_params));

    this.props.navigation.navigate('Details', {
      order_id: order_id,
      key_order: key_order,
      type_order: type_order,
      page: 'list',
    });
  };

  open_new = async () => {
    let new_params = {};
    await AsyncStorage.setItem('current_params', JSON.stringify(new_params));
    this.props.navigation.navigate('New');
  };

  open_map = async () => {
    let new_params = {};
    await AsyncStorage.setItem('current_params', JSON.stringify(new_params));

    this.props.navigation.navigate('Home', { markers: this.state.markers });
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
      <Drawer
        ref={(ref) => {
          this.drawer = ref;
        }}
        content={<SideBar navigation={this.props.navigation} />}
        onClose={() => this.drawer._root.close()}
      >
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

        <Modal animationType='slide' transparent={true} visible={this.state.visible_modal2}>
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
              <Button Text='Close' onPress={() => this.setState({ visible_modal2: false })} textStyle={{ fontFamily: 'uber', fontSize: 16 }} viewStyle={{ marginBottom: 20 }} />
            </View>
          </View>
        </Modal>

        <View style={[container.container]}>
          <View style={{ marginRight: 10, marginTop: 10, marginBottom: 5 }}>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                marginHorizontal: 2,
                marginTop: 25,
              }}
            >
              <View
                style={{
                  height: 10,
                  width: 30,
                  justifyContent: 'center',
                }}
              ></View>
            </View>
          </View>
          <Tabs
            tabBarUnderlineStyle={{
              backgroundColor: '#727cf5',
              borderRadius: 130,
            }}
            tabContainerStyle={{
              elevation: 0,
              borderBottomColor: Color.white,
            }}
            renderTabBar={() => <ScrollableTab backgroundColor='transparent' style={{ backgroundColor: 'transparent' }} />}
          >
            <Tab
              activeTabStyle={{ backgroundColor: Color.white }}
              heading={'Assigned (' + this.state.count_1 + ')'}
              activeTextStyle={{
                color: Color.black,
                fontSize: 8,
                fontFamily: 'uber',
              }}
              tabStyle={{ backgroundColor: Color.white }}
              textStyle={{
                color: Color.steel,
                fontSize: 8,
                fontFamily: 'uber',
              }}
            >
              <ScrollView style={{ flex: 0.85 }}>
                <List style={{ marginVertical: 20, marginHorizontal: 15 }}>
                  {this.state.markers.map((marker, key) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.open_details(marker.order_id, key, 'open');
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'column',
                          borderBottomWidth: 1,
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottomColor: '#C9C9C9',
                        }}
                      >
                        <View style={{ width: '100%', flex: 1 }}>
                          <Text style={{ paddingTop: 2, color: '#ccc' }}>
                            ID {marker.code}-{marker.order_id}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                          <View style={{ flex: 0.9 }}>
                            <Text numberOfLines={1}>{marker.title} </Text>
                          </View>
                          <View style={{ flex: 0.1 }}>
                            {marker.priority == '1' && (
                              <Image
                                source={require('../../Image/priority2.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            )}
                            {marker.priority == '2' && (
                              <Image
                                source={require('../../Image/priority1.png')}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            )}
                          </View>
                        </View>
                        <View style={{ width: '100%', flex: 1 }}>
                          <Text numberOfLines={1} style={{ paddingTop: 2, color: '#ccc' }}>
                            Comment: {marker.notes}
                          </Text>
                        </View>
                        {key == this.state.current_open_key && (
                          <View
                            style={{
                              marginTop: 20,
                              position: 'absolute',
                              marginLeft: width - 80,
                              alignContent: 'flex-end',
                            }}
                          >
                            <ActivityIndicator size='large' color='#000000' />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </List>
              </ScrollView>
            </Tab>

            <Tab
              activeTabStyle={{ backgroundColor: Color.white }}
              heading={'Complete (' + this.state.count_2 + ')'}
              activeTextStyle={{
                color: Color.black,
                fontSize: 8,
                fontFamily: 'uber',
              }}
              tabStyle={{ backgroundColor: Color.white }}
              textStyle={{
                color: Color.steel,
                fontSize: 8,
                fontFamily: 'uber',
              }}
            >
              <ScrollView style={{ flex: 0.85 }}>
                <List style={{ marginVertical: 20, marginHorizontal: 15 }}>
                  {this.state.markers2.map((marker, key) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.open_details(marker.order_id, key, 'completed');
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'column',
                          borderBottomWidth: 1,
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottomColor: '#C9C9C9',
                        }}
                      >
                        <View style={{ width: '100%', flex: 1 }}>
                          <Text style={{ paddingTop: 2, color: '#ccc' }}>
                            ID {marker.code}-{marker.order_id}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                          <View style={{ flex: 1 }}>
                            <Text>{marker.title} </Text>
                          </View>
                        </View>
                        {key == this.state.current_completed_key && (
                          <View
                            style={{
                              marginTop: 20,
                              position: 'absolute',
                              marginLeft: width - 80,
                              alignContent: 'flex-end',
                            }}
                          >
                            <ActivityIndicator size='large' color='#000000' />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </List>
              </ScrollView>
            </Tab>

            <Tab
              activeTabStyle={{ backgroundColor: Color.white }}
              heading={'Survey (' + this.state.count_3 + ')'}
              activeTextStyle={{
                color: Color.black,
                fontSize: 8,
                fontFamily: 'uber',
              }}
              tabStyle={{ backgroundColor: Color.white }}
              textStyle={{
                color: Color.steel,
                fontSize: 8,
                fontFamily: 'uber',
              }}
            >
              <ScrollView style={{ flex: 0.85 }}>
                <List style={{ marginVertical: 20, marginHorizontal: 15 }}>
                  {this.state.markers3.map((marker, key) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.open_details(marker.order_id, key, 'survey');
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'column',
                          borderBottomWidth: 1,
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottomColor: '#C9C9C9',
                        }}
                      >
                        <View style={{ width: '100%', flex: 1 }}>
                          <Text style={{ paddingTop: 2, color: '#ccc' }}>
                            ID {marker.code}-{marker.order_id}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                          <View style={{ flex: 1 }}>
                            <Text>{marker.title} </Text>
                          </View>
                        </View>
                        {key == this.state.current_survey_key && (
                          <View
                            style={{
                              marginTop: 20,
                              position: 'absolute',
                              marginLeft: width - 80,
                              alignContent: 'flex-end',
                            }}
                          >
                            <ActivityIndicator size='large' color='#000000' />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </List>
              </ScrollView>
            </Tab>
          </Tabs>
          <View
            style={{
              marginTop: 5,
              position: 'absolute',
              flex: 1,
              marginLeft: 15,
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
              marginTop: height - 130,
              position: 'absolute',
              flex: 1,
              marginLeft: width - 70,
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

          <View
            style={{
              marginTop: height - 190,
              position: 'absolute',
              flex: 1,
              marginLeft: width - 70,
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
              }}
              onPress={() => {
                this.reload_orders('btn');
              }}
            >
              <Image
                source={require('../../Image/menu_6.png')}
                style={{
                  width: 55,
                  height: 55,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: height - 250,
              position: 'absolute',
              flex: 1,
              marginLeft: width - 70,
            }}
          >
            <TouchableOpacity
              style={{
                position: 'absolute',
              }}
              onPress={() => {
                this.open_map();
              }}
            >
              <Image
                source={require('../../Image/menu_5.png')}
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
                marginTop: height - 310,
                position: 'absolute',
                flex: 1,
                marginLeft: width - 70,
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
                marginTop: height - 310,
                position: 'absolute',
                flex: 1,
                marginLeft: width - 70,
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
          <View style={{ flex: 0.07, flexDirection: 'row' }}>
            <View style={{ width: '10%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}></View>
            <View style={{ width: '80%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
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
            <View style={{ width: '10%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              {this.state.is_conected == 'false' && <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red' }}></View>}
              {this.state.is_conected == 'true' && <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'green' }}></View>}
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}
Drawer.defaultProps.styles.mainOverlay.elevation = 0;
