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
  BackHandler,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
} from 'react-native';
import container from '../../Styles/Container/style';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
import { Tab, Tabs, ScrollableTab, List, ListItem, Picker, Item, Content, Icon } from 'native-base';
import Button from '../../Component/Button/index';
import * as ImagePicker from 'expo-image-picker';
import Color from '../../Config/Color';
import style from './style';
import API from '../../utils/api';
import * as Permissions from 'expo-permissions';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import getDirections from 'react-native-google-maps-directions';
import { HideWithKeyboard, ShowWithKeyboard } from 'react-native-hide-with-keyboard';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageZoom from 'react-native-image-pan-zoom';
import NetInfo from '@react-native-community/netinfo';

import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
      props: props,
      username: '',
      password: '',
      spinner: false,
      error: false,
      selectedItem: undefined,
      selected1: 'key0',
      results: {
        items: [],
      },
      b_image: [],
      b_show_image: false,
      b_show_images: false,
      b_currect_img: 0,
      b_add_btn: require('../../Image/camera2.png'),
      b_galery_btn: require('../../Image/galery.png'),
      a_image: [],
      a_show_image: false,
      a_show_images: false,
      a_currect_img: 0,
      a_add_btn: require('../../Image/camera2.png'),
      a_galery_btn: require('../../Image/galery.png'),
      order_data: [],
      contracts: [],
      zones: [],
      services: [],
      surfaces: [],
      edit_priority: '',
      edit_status: '',
      edit_square_footage: '',
      edit_service: '',
      edit_surface: '',
      edit_contract: 0,
      edit_zone: 0,
      modalVisible: false,
      modal2Visible: false,
      modal3Visible: false,
      modal4Visible: false,
      modalImage: false,
      modalImage2: false,
      modal_select_upload: false,
      modal_confirm_delete: false,
      modal_confirm_delete_a: false,
      modal_validate: false,
      images_to_upload: [],
      current_updating: 0,
      des_lat: '',
      des_log: '',
      location: '',
      username: '',
      new_comment: '',
      new_note: '',
      edit_comment: false,
      markers: [],
      last_note: false,
      address_from: '',
      new_address: '',
      showPlacesList: false,
      latitude_new: '',
      longitude_new: '',
      zones_ids: '',
      text_btn: 'Save Changes',
      actual_status: '',
      order_type: '',
      validate_address: '#ebebeb',
      validate_contract: '#ebebeb',
      validate_zone: '#ebebeb',
      validate_surface: '#ebebeb',
      validate_service: '#ebebeb',
      validate_square: '#ebebeb',
      validate_reason: '#ebebeb',
      validate_r_reason: '#ebebeb',
      show_address: false,
      address_edit: '0',
      activity_indicator: false,
      is_conected: 'false',
      edit_local: 'false',
      order_id_editing: 0,
      margin_close: 10,
      is_conected: 'false',
      show_reason: false,
      edit_reason: '',
      show_r_reason: false,
      edit_r_reason: '',
      index_contract: -1,
      index_zone: -1,
      index_surface: -1,
      default_1: -1,
      square_footage_r: 0,
      modal_square: false,
      square_footage_w: '',
      square_footage_h: '',
      new_params: [],
    };
  }

  scrollToTop = () => {
    this.scroller.scrollTo({ x: 0, y: 0, animated: true });
  };

  async componentDidMount() {
    let speed = 0;

    try {
      let downloadSizeInBits = 12000000;
      let startTime = new Date().getTime();
      await fetch('https://urbangraffitilogin.com/');
      let endTime = new Date().getTime();
      let duration = (endTime - startTime) / 1000;
      speed = downloadSizeInBits / (1024 * 1024 * duration);
      this.setState({ test: speed });
    } catch (error) {
      speed = 0;
      this.setState({ test: 0 });
      console.error(error);
    }

    speed = parseFloat(speed);

    let new_params = await AsyncStorage.getItem('current_params');
    new_params = JSON.parse(new_params);
    this.setState({ new_params: new_params });

    await NetInfo.fetch().then((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      is_com = false;

      if (state.type != 'wifi') {
        if (speed > 0.8) {
          this.setState({ is_conected: state.isConnected.toString() });
          is_com = state.isConnected;
        } else {
          this.setState({ is_conected: 'false' });
          is_com = false;
        }
      } else {
        this.setState({ is_conected: state.isConnected.toString() });
        is_com = state.isConnected;
      }

      const { navigation } = this.props;
      console.log(navigation);
      //const itemId = navigation.getParam('order_id', 'NO-ID');
      //console.log(itemId);

      console.log(new_params);

      this.setState({ order_id_editing: new_params.order_id });
      if (is_com) {
        if (new_params.order_id == 0) {
          this._getDetails_local();
          this.setState({ is_conected: 'true' });
          this.setState({ edit_local: 'new' });
        } else {
          this._getDetails();
          //force disconected
          this.setState({ is_conected: 'true' });
          this.setState({ edit_local: 'false' });
        }
      } else {
        //this._getDetails();
        this._getDetails_local();
        this.setState({ is_conected: 'false' });
        this.setState({ edit_local: 'true' });
      }
    });

    if (width < 350) {
      this.setState({
        font1: 12,
        font2: 10,
        h_autocomplete: 90,
      });
    } else {
      this.setState({
        font1: 15,
        font2: 13,
        h_autocomplete: 60,
      });
    }

    if (Platform.OS != 'android') {
      this.setState({ margin_close: 80 });
    }

    BackHandler.addEventListener('hardwareBackPress', this.backAction);

    this._getLocationAsync();

    this.getPermissionAsync();
    console.log('hi');

    const { navigation } = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      //const { params } = this.props.navigation.state;
      if (this.state.new_params.new_address) {
        // console.log(params);
        this.setState({
          address_from: this.state.new_params.new_address,
          new_address: this.state.new_params.new_address,
          latitude_new: this.state.new_params.new_lat,
          longitude_new: this.state.new_params.new_log,
          show_address: false,
          address_edit: '1',
        });
        this._get_zone_2();
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backAction);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('here');
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(location);
  };

  get_zone(value) {
    this.setState({
      latitude_new: value.geometry.location.lat,
      longitude_new: value.geometry.location.lng,
    });
    this._get_zone_2();
  }

  _get_zone_2 = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    //console.log("enter here 2");

    let data_response = await API.get_zone_new_order(user_id, token, this.state.latitude_new, this.state.longitude_new);
    //console.log(data_response);

    let array = [{ agency_id: '0', contract_id: '0', contract_name: 'Select' }];
    let array2 = [{ zone_id: '0', zone_name: 'Select' }];

    console.log('test', data_response.zone_id);

    this.setState({
      zones: array2.concat(data_response.zones),
      contracts: array.concat(data_response.contracts),
      zones_ids: data_response.zones_ids,
    });

    this.setState({
      edit_zone: data_response.zone_id,
      edit_contract: data_response.contract_id,
    });

    let find_contract = 0;
    let find_zone = 0;

    for (var i = 0; i < this.state.contracts.length; i++) {
      if (data_response.contract_id == this.state.contracts[i].contract_id) {
        this.setState({
          index_contract: i,
        });
        find_contract = 1;
      }
    }

    for (i = 0; i < this.state.zones.length; i++) {
      if (data_response.zone_id == this.state.zones[i].zone_id) {
        this.setState({
          index_zone: i,
        });
        find_zone = 1;
      }
    }

    if (find_contract == 0) {
      this.setState({
        index_contract: -1,
        index_zone: -1,
      });
    }
  };

  _get_zone_3 = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    //console.log("enter here 2");

    let data_response = await API.get_zone_new_order2(user_id, token, this.state.edit_contract, this.state.zones_ids);
    //console.log(data_response);

    this.setState({
      zones: data_response.zones,
    });
  };

  _getDetails = async () => {
    const user = await AsyncStorage.getItem('userName');
    this.setState({ username: user });

    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    //const { params } = this.props.navigation.state;
    console.log('here');
    console.log(this.state.new_params);
    let data_response = await API.get_order(user_id, token, this.state.new_params.order_id);
    console.log(data_response);
    if (data_response.message == 'invalid_login') {
    } else {
      console.log(data_response);
      this.setState({
        order_data: data_response.order[0],
        edit_priority: data_response.order[0].priority,
        edit_status: data_response.order[0].tech_status,
        actual_status: data_response.order[0].tech_status,
        edit_square_footage: data_response.order[0].square_footage,
        edit_service: data_response.order[0].service_id,
        edit_surface: data_response.order[0].surface_id,
        edit_contract: data_response.order[0].contract_id,
        edit_zone: data_response.order[0].zone_id,
        contracts: data_response.contracts,
        zones: data_response.zones,
        services: data_response.services,
        surfaces: data_response.surfaces,
        edit_comment: data_response.order[0].notes,
        r_comment: data_response.order[0].notes,
        address_from: data_response.order[0].address,
        new_address: data_response.order[0].address,
        latitude_new: data_response.order[0].address_lat,
        longitude_new: data_response.order[0].address_long,
        order_type: data_response.order[0].order_type,
      });
      for (var i = 0; i < data_response.contracts.length; i++) {
        if (data_response.order[0].contract_id == data_response.contracts[i].contract_id) {
          this.setState({
            index_contract: i,
          });
        }
      }

      for (i = 0; i < data_response.zones.length; i++) {
        if (data_response.order[0].zone_id == data_response.zones[i].zone_id) {
          this.setState({
            index_zone: i,
          });
        }
      }

      for (i = 0; i < data_response.surfaces.length; i++) {
        if (data_response.order[0].surface_id == data_response.surfaces[i].surface_id) {
          this.setState({
            index_surface: i,
          });
        }
      }

      for (i = 0; i < data_response.services.length; i++) {
        if (data_response.order[0].service_id == data_response.services[i].service_id) {
          this.setState({
            index_service: i,
          });
        }
      }

      if (data_response.order[0].tech_status == 'unassigned' && data_response.order[0].new_source == 'Survey') {
        this.setState({
          edit_status: 'survey',
          actual_status: 'survey',
        });

        this.setState({
          default_1: 2,
        });
      }

      if (data_response.order[0].tech_status == 'open') {
        this.setState({
          default_1: 0,
        });
      }
      if (data_response.order[0].tech_status == 'completed') {
        this.setState({
          default_1: 1,
        });
      }

      let a;
      a = this.state.markers.splice();
      i = 0;
      let e = 0;
      for (let userObject of data_response.notes) {
        if (e == 0 && userObject.type == 'note') {
          this.setState({ last_note: userObject.note });
          e++;
        }
        a[i] = {
          note: userObject.note,
          user_note: userObject.user_note,
          date: userObject.date_formated,
        };
        i++;
      }
      this.setState({ markers: a });
      //this.setState({ count_1 : Object.keys(data_response.orders).length  });

      this.setState({ des_lat: parseFloat(data_response.order[0].address_lat) });
      this.setState({ des_log: parseFloat(data_response.order[0].address_long) });

      for (let before_image of data_response.before_images) {
        console.log(before_image);
        let new_object = {
          route: 'http://urbangraffitilogin.com/uploads/' + before_image.image_url,
          type: 'uploaded',
        };
        var joined = this.state.b_image.concat(new_object);
        this.setState({ b_image: joined });
      }

      let count = this.state.b_image.length;
      if (count > 0) {
        this.setState({
          b_show_image: 'show',
        });
      }
      if (count > 1) {
        this.setState({
          b_show_images: 'show',
        });
      }
      let new_current = count - 1;
      this.setState({
        b_currect_img: new_current,
      });

      if (count == 6) {
        this.setState({
          b_add_btn: require('../../Image/camera2_gray.png'),
        });
        this.setState({
          b_galery_btn: require('../../Image/galery_gray.png'),
        });
      }

      for (let after_image of data_response.after_images) {
        console.log(after_image);
        let new_object = {
          route: 'http://urbangraffitilogin.com/uploads/' + after_image.image_url,
          type: 'uploaded',
        };
        var joined = this.state.a_image.concat(new_object);
        this.setState({ a_image: joined });
      }

      let count2 = this.state.a_image.length;
      if (count2 > 0) {
        this.setState({
          a_show_image: 'show',
        });
      }
      if (count2 > 1) {
        this.setState({
          a_show_images: 'show',
        });
      }
      let new_current2 = count2 - 1;
      this.setState({
        a_currect_img: new_current2,
      });

      if (count2 == 6) {
        this.setState({
          a_add_btn: require('../../Image/camera2_gray.png'),
        });
        this.setState({
          a_galery_btn: require('../../Image/galery_gray.png'),
        });
      }
    }
  };

  _getDetails_local = async () => {
    const user = await AsyncStorage.getItem('userName');
    this.setState({ username: user });

    //const { params } = this.props.navigation.state;
    console.log('order_local');
    console.log(this.state.new_params);

    const local_orders = await AsyncStorage.getItem('orders_local_3');
    let read_local_orders = JSON.parse(local_orders);

    const local_orders_data = await AsyncStorage.getItem('new_order_data');
    data_response = JSON.parse(local_orders_data);

    let order_edit = [];

    if (this.state.new_params.type_order == 'open') {
      order_edit = read_local_orders.orders[this.state.new_params.key_order];
    }
    if (this.state.new_params.type_order == 'completed') {
      order_edit = read_local_orders.orders_completed[this.state.new_params.key_order];
    }
    if (this.state.new_params.type_order == 'survey') {
      order_edit = read_local_orders.orders_survey[this.state.new_params.key_order];
    }

    this.setState({
      order_data: order_edit,
      edit_priority: order_edit.priority,
      edit_status: order_edit.tech_status,
      actual_status: order_edit.tech_status,
      edit_square_footage: order_edit.square_footage,
      edit_service: order_edit.service_id,
      edit_surface: order_edit.surface_id,
      edit_contract: order_edit.contract_id,
      edit_zone: order_edit.zone_id,
      contracts: data_response.contracts,
      zones: data_response.zones,
      services: data_response.services,
      surfaces: data_response.surfaces,
      edit_comment: order_edit.notes,
      address_from: order_edit.address,
      new_address: order_edit.address,
      latitude_new: order_edit.address_lat,
      longitude_new: order_edit.address_long,
      order_type: order_edit.order_type,
    });

    for (var i = 0; i < this.state.contracts.length; i++) {
      if (order_edit.contract_id == this.state.contracts[i].contract_id) {
        this.setState({
          index_contract: i,
        });
      }
    }

    for (var i = 0; i < this.state.zones.length; i++) {
      if (order_edit.zone_id == this.state.zones[i].zone_id) {
        this.setState({
          index_zone: i,
        });
      }
    }

    for (var i = 0; i < this.state.surfaces.length; i++) {
      if (order_edit.surface_id == this.state.surfaces[i].zone_id) {
        this.setState({
          index_surface: i,
        });
      }
    }

    for (var i = 0; i < this.state.services.length; i++) {
      if (order_edit.service_id == this.state.services[i].zone_id) {
        this.setState({
          index_service: i,
        });
      }
    }

    if (order_edit.tech_status == 'unassigned' && order_edit.new_source == 'Survey') {
      this.setState({
        edit_status: 'survey',
        actual_status: 'survey',
      });

      this.setState({
        default_1: 2,
      });
    }

    if (order_edit.tech_status == 'open') {
      this.setState({
        default_1: 0,
      });
    }
    if (order_edit.tech_status == 'completed') {
      this.setState({
        default_1: 1,
      });
    }

    if (order_edit.notes_local) {
      this.setState({ markers: order_edit.notes_local });
    } else {
      if (order_edit.notes_history) {
        let a;
        a = this.state.markers.splice();
        let i = 0;
        let e = 0;
        for (let userObject of order_edit.notes_history) {
          if (e == 0 && userObject.type == 'note') {
            this.setState({ last_note: userObject.note });
            e++;
          }
          a[i] = {
            note: userObject.note,
            user_note: userObject.user_note,
            date: userObject.date_formated,
            note_status: 'uploaded',
          };
          i++;
        }

        this.setState({ markers: a });
      }
    }

    console.log(order_edit);
    console.log(order_edit.before_images_local);

    if (order_edit.before_images_local) {
      this.setState({ b_image: order_edit.before_images_local });
    } else {
      for (let before_image of order_edit.before_images) {
        console.log(before_image);
        let new_object = {
          route:
            'data:image/webp;base64,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',
          type: 'uploaded',
        };
        var joined = this.state.b_image.concat(new_object);
        this.setState({ b_image: joined });
      }
    }

    let count = this.state.b_image.length;
    if (count > 0) {
      this.setState({
        b_show_image: 'show',
      });
    }
    if (count > 1) {
      this.setState({
        b_show_images: 'show',
      });
    }
    let new_current = count - 1;
    this.setState({
      b_currect_img: new_current,
    });

    if (count == 6) {
      this.setState({
        b_add_btn: require('../../Image/camera2_gray.png'),
      });
      this.setState({
        b_galery_btn: require('../../Image/galery_gray.png'),
      });
    }

    if (order_edit.after_images_local) {
      this.setState({ a_image: order_edit.after_images_local });
    } else {
      for (let after_image of order_edit.after_images) {
        console.log(after_image);
        let new_object = {
          route:
            'data:image/webp;base64,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',
          type: 'uploaded',
        };
        var joined = this.state.a_image.concat(new_object);
        this.setState({ a_image: joined });
      }
    }

    let count2 = this.state.a_image.length;
    if (count2 > 0) {
      this.setState({
        a_show_image: 'show',
      });
    }
    if (count2 > 1) {
      this.setState({
        a_show_images: 'show',
      });
    }
    let new_current2 = count2 - 1;
    this.setState({
      a_currect_img: new_current2,
    });

    if (count2 == 6) {
      this.setState({
        a_add_btn: require('../../Image/camera2_gray.png'),
      });
      this.setState({
        a_galery_btn: require('../../Image/galery_gray.png'),
      });
    }
  };

  back = async () => {
    const page = await AsyncStorage.getItem('page');
    console.log('page :' + page);
    //this.props.navigation.goBack();
    if (page == 'map') {
      let new_params = {};
      await AsyncStorage.setItem('current_params', JSON.stringify(new_params));
      this.props.navigation.navigate('Home');
    } else {
      let new_params = {};
      await AsyncStorage.setItem('current_params', JSON.stringify(new_params));
      this.props.navigation.navigate('List');
    }
  };

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
    } else {
      console.log('persion');
    }

    const { status2 } = await Permissions.askAsync(Permissions.CAMERA);
    if (status2 !== 'granted') {
    } else {
      console.log('persion');
    }
  };

  _pickImage = async () => {
    let count1 = this.state.b_image.length;
    if (count1 < 6) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        var wantedMaxSize = 2000;
        var rawheight = result.assets[0].height;
        var rawwidth = result.assets[0].width;

        var ratio = rawwidth / rawheight;
        // check vertical or horizont
        if (rawheight > rawwidth) {
          var wantedwidth = wantedMaxSize * ratio;
          var wantedheight = wantedMaxSize;
        } else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }

        if (Platform.OS == 'android') {
          try {
            let asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
            let DCIM_id = asset.albumId;
            let album = await MediaLibrary.createAlbumAsync('UrbanGraffiti', asset);
            await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);
          } catch (error) {}
        }

        var manipResult = await ImageManipulator.manipulateAsync(result.assets[0].uri, [{ resize: { height: 1024 } }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        };
        var joined = this.state.b_image.concat(new_object);
        this.setState({ b_image: joined });
        let count = this.state.b_image.length;

        let new_current = count - 1;
        console.log('new current');
        console.log(new_current);
        this.setState({
          b_currect_img: new_current,
        });

        if (count == 1) {
          this.setState({
            b_show_image: 'show',
          });
        }
        if (count > 1) {
          this.setState({
            b_show_images: 'show',
          });
        }

        if (count == 6) {
          this.setState({
            b_add_btn: require('../../Image/camera2_gray.png'),
          });
          this.setState({
            b_galery_btn: require('../../Image/galery_gray.png'),
          });
        }

        //this.close_select_upload();
      }
    }
  };

  _pickImage_galery = async () => {
    let count1 = this.state.b_image.length;
    if (count1 < 6) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.6,
      });

      console.log(result);

      if (!result.cancelled) {
        var wantedMaxSize = 2000;
        var rawheight = result.height;
        var rawwidth = result.width;

        var ratio = rawwidth / rawheight;
        // check vertical or horizont
        if (rawheight > rawwidth) {
          var wantedwidth = wantedMaxSize * ratio;
          var wantedheight = wantedMaxSize;
        } else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }
        if (Platform.OS == 'android') {
          /*
          let asset = await MediaLibrary.createAssetAsync(result.uri);
          let DCIM_id = asset.albumId;
          let album = await MediaLibrary.createAlbumAsync("UrbanGraffiti",asset);
          await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);
          */
        }
        /*
        let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(result.uri,
                {
                    offset: { x: 0, y: 0 },
                    size: { width: result.width, height: result.height },
                    displaySize: { width: wantedwidth, height: wantedheight },
                    resizeMode: 'contain',
                },
                (uri) => resolve(uri),
                () => reject(),
            );
        });
        
        console.log("img modificada");
        console.log(resizedUri);
        */

        var manipResult = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { height: 1024 } }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        };
        var joined = this.state.b_image.concat(new_object);
        this.setState({ b_image: joined });
        let count = this.state.b_image.length;

        let new_current = count - 1;
        this.setState({
          b_currect_img: new_current,
        });

        if (count == 1) {
          this.setState({
            b_show_image: 'show',
          });
        }
        if (count > 1) {
          this.setState({
            b_show_images: 'show',
          });
        }

        if (count == 6) {
          this.setState({
            b_add_btn: require('../../Image/camera2_gray.png'),
          });
          this.setState({
            b_galery_btn: require('../../Image/galery_gray.png'),
          });
        }
        //this.close_select_upload();
      }
    }
  };

  _pickImage_a = async () => {
    let count1 = this.state.a_image.length;
    if (count1 < 6) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.6,
      });

      console.log(result);

      if (!result.cancelled) {
        var wantedMaxSize = 2000;
        var rawheight = result.assets[0].height;
        var rawwidth = result.assets[0].width;

        var ratio = rawwidth / rawheight;
        // check vertical or horizont
        if (rawheight > rawwidth) {
          var wantedwidth = wantedMaxSize * ratio;
          var wantedheight = wantedMaxSize;
        } else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }
        if (Platform.OS == 'android') {
          try {
            let asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
            let DCIM_id = asset.albumId;
            let album = await MediaLibrary.createAlbumAsync('UrbanGraffiti', asset);
            await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);
          } catch (error) {}
        }
        //MediaLibrary.saveToLibraryAsync(result.uri,album);

        /*
        let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(result.uri,
                {
                    offset: { x: 0, y: 0 },
                    size: { width: result.width, height: result.height },
                    displaySize: { width: wantedwidth, height: wantedheight },
                    resizeMode: 'contain',
                },
                (uri) => resolve(uri),
                () => reject(),
            );
        });
        
        console.log("img modificada");
        console.log(resizedUri);        
        */

        var manipResult = await ImageManipulator.manipulateAsync(result.assets[0].uri, [{ resize: { height: 1024 } }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        };
        var joined = this.state.a_image.concat(new_object);
        this.setState({ a_image: joined });
        let count = this.state.a_image.length;

        let new_current = count - 1;
        this.setState({
          a_currect_img: new_current,
        });

        if (count == 1) {
          this.setState({
            a_show_image: 'show',
          });
        }
        if (count > 1) {
          this.setState({
            a_show_images: 'show',
          });
        }

        if (count == 6) {
          this.setState({
            a_add_btn: require('../../Image/camera2_gray.png'),
          });
          this.setState({
            a_galery_btn: require('../../Image/galery_gray.png'),
          });
        }
      }
    }
  };

  _pickImage_galery_a = async () => {
    let count1 = this.state.a_image.length;
    if (count1 < 6) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.6,
      });

      console.log(result);

      if (!result.cancelled) {
        var wantedMaxSize = 2000;
        var rawheight = result.height;
        var rawwidth = result.width;

        var ratio = rawwidth / rawheight;
        // check vertical or horizont
        if (rawheight > rawwidth) {
          var wantedwidth = wantedMaxSize * ratio;
          var wantedheight = wantedMaxSize;
        } else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }
        if (Platform.OS == 'android') {
          /*
          let asset = await MediaLibrary.createAssetAsync(result.uri);
          let DCIM_id = asset.albumId;
          let album = await MediaLibrary.createAlbumAsync("UrbanGraffiti",asset);
          await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);
          */
        }
        /*
        let resizedUri = await new Promise((resolve, reject) => {
            ImageEditor.cropImage(result.uri,
                {
                    offset: { x: 0, y: 0 },
                    size: { width: result.width, height: result.height },
                    displaySize: { width: wantedwidth, height: wantedheight },
                    resizeMode: 'contain',
                },
                (uri) => resolve(uri),
                () => reject(),
            );
        });
        
        console.log("img modificada");
        console.log(resizedUri);
        */

        var manipResult = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { height: 1024 } }], { compress: 1, format: ImageManipulator.SaveFormat.JPEG });

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        };
        var joined = this.state.a_image.concat(new_object);
        this.setState({ a_image: joined });
        let count = this.state.a_image.length;

        let new_current = count - 1;
        this.setState({
          a_currect_img: new_current,
        });

        if (count == 1) {
          this.setState({
            a_show_image: 'show',
          });
        }
        if (count > 1) {
          this.setState({
            a_show_images: 'show',
          });
        }

        if (count == 6) {
          this.setState({
            a_add_btn: require('../../Image/camera2_gray.png'),
          });
          this.setState({
            a_galery_btn: require('../../Image/galery_gray.png'),
          });
        }
        //this.close_select_upload();
      }
    }
  };

  prev_img = async () => {
    console.log('test');
    let count = this.state.b_image.length;
    let currect_img = this.state.b_currect_img;
    let new_current = currect_img - 1;
    if (new_current < 0) {
      new_current = count - 1;
    }
    this.setState({
      b_currect_img: new_current,
    });
  };

  prev_img_a = async () => {
    console.log('test');
    let count = this.state.a_image.length;
    let currect_img = this.state.a_currect_img;
    let new_current = currect_img - 1;
    if (new_current < 0) {
      new_current = count - 1;
    }
    this.setState({
      a_currect_img: new_current,
    });
  };

  next_img = async () => {
    console.log('test');
    let count = this.state.b_image.length;
    let currect_img = this.state.b_currect_img;
    let new_current = currect_img + 1;
    if (new_current >= count) {
      new_current = 0;
    }
    this.setState({
      b_currect_img: new_current,
    });
  };

  next_img_a = async () => {
    console.log('test');
    let count = this.state.a_image.length;
    let currect_img = this.state.a_currect_img;
    let new_current = currect_img + 1;
    if (new_current >= count) {
      new_current = 0;
    }
    this.setState({
      a_currect_img: new_current,
    });
  };

  onValueChange(value) {
    this.setState({
      selected1: value,
    });
  }

  change_address_btn() {
    this.setState({
      show_address: true,
      show_address: true,
      new_address: '',
      address_from: '',
      address_edit: '1',
    });
  }

  change_address_text() {
    this.setState({
      show_address: true,
      show_address: true,
      address_edit: '1',
    });
  }

  _get_zone_ofline = async () => {
    let local_orders_data = await AsyncStorage.getItem('new_order_data');
    let data_response = JSON.parse(local_orders_data);
    let all_zones = data_response.zones;
    let new_zones = [];
    console.log(all_zones);

    for (var i = 0; i < all_zones.length; i++) {
      if (all_zones[i].contract_id == this.state.edit_contract) {
        new_zones.push(all_zones[i]);
      }
    }

    this.setState({
      zones: [],
    });

    this.setState({
      zones: new_zones,
      index_zone: -1,
    });
  };

  pre_remove_img_btn = async (key) => {
    this.setState({
      b_currect_img: key,
    });
    this.setState({
      modal_confirm_delete: true,
    });
  };

  pre_remove_img_btn_a = async (key) => {
    this.setState({
      a_currect_img: key,
    });
    this.setState({
      modal_confirm_delete_a: true,
    });
  };

  remove_img_btn = async () => {
    this.setState({
      modal_confirm_delete: true,
    });
  };

  cancel_delete_img = async () => {
    this.setState({
      modal_confirm_delete: false,
    });
  };

  remove_img_btn_a = async () => {
    this.setState({
      modal_confirm_delete_a: true,
    });
  };

  cancel_delete_img_a = async () => {
    this.setState({
      modal_confirm_delete_a: false,
    });
  };

  remove_img = async () => {
    this.setState({
      modal_confirm_delete: false,
    });

    let currect_img2 = this.state.b_currect_img;
    let images1;
    images1 = this.state.b_image;
    images1.splice(currect_img2, 1);
    this.setState({
      b_image: images1,
    });
    if (currect_img2 > 0) {
      let new_current2 = currect_img2 - 1;
      this.setState({
        b_currect_img: new_current2,
      });
    }
    let count = this.state.b_image.length;
    if (count == 0) {
      this.setState({
        b_image: [],
        b_show_image: false,
        b_show_images: false,
      });
    }
    if (count == 1) {
      this.setState({
        b_show_image: 'show',
        b_show_images: false,
      });
    }
    if (count > 1) {
      this.setState({
        b_show_images: 'show',
      });
    }

    this.setState({
      b_add_btn: require('../../Image/camera2.png'),
    });
    this.setState({
      b_galery_btn: require('../../Image/galery.png'),
    });
  };

  remove_img_a = async () => {
    this.setState({
      modal_confirm_delete_a: false,
    });

    let currect_img2 = this.state.a_currect_img;
    let images1;
    images1 = this.state.a_image;
    images1.splice(currect_img2, 1);
    this.setState({
      a_image: images1,
    });
    if (currect_img2 > 0) {
      let new_current2 = currect_img2 - 1;
      this.setState({
        a_currect_img: new_current2,
      });
    }
    let count = this.state.a_image.length;
    if (count == 0) {
      this.setState({
        a_image: [],
        a_show_image: false,
        a_show_images: false,
      });
    }
    if (count == 1) {
      this.setState({
        a_show_image: 'show',
        a_show_images: false,
      });
    }
    if (count > 1) {
      this.setState({
        a_show_images: 'show',
      });
    }

    this.setState({
      a_add_btn: require('../../Image/camera2.png'),
    });
    this.setState({
      a_galery_btn: require('../../Image/galery.png'),
    });
  };

  submit_info = async () => {
    this.setState({ activity_indicator: true });

    if (this.state.new_address == '') {
      this.setState({ validate_address: '#FF0000' });
    } else {
      this.setState({ validate_address: '#ebebeb' });
    }

    if (this.state.edit_contract == '0' || this.state.edit_contract == '') {
      this.setState({ validate_contract: '#FF0000' });
    } else {
      this.setState({ validate_contract: '#ebebeb' });
    }

    if ((this.state.edit_zone == '0' || this.state.edit_zone == '') && this.state.order_type == 'regular') {
      this.setState({ validate_zone: '#FF0000' });
    } else {
      this.setState({ validate_zone: '#ebebeb' });
    }

    if ((this.state.edit_surface == '0' || this.state.edit_surface == '') && this.state.edit_status == 'completed' && this.state.order_type == 'regular') {
      this.setState({ validate_surface: '#FF0000' });
    } else {
      this.setState({ validate_surface: '#ebebeb' });
    }

    if ((this.state.edit_service == '0' || this.state.edit_service == '') && this.state.edit_status == 'completed' && this.state.order_type == 'regular') {
      this.setState({ validate_service: '#FF0000' });
    } else {
      this.setState({ validate_service: '#ebebeb' });
    }

    if (this.state.edit_square_footage == '' && this.state.edit_status == 'completed' && this.state.order_type == 'regular') {
      this.setState({ validate_square: '#FF0000' });
    } else {
      this.setState({ validate_square: '#ebebeb' });
    }

    if (this.state.edit_reason == '' && this.state.edit_status == 'closed') {
      this.setState({ validate_reason: '#FF0000' });
    } else {
      this.setState({ validate_reason: '#ebebeb' });
    }

    if (this.state.edit_r_reason == '' && this.state.edit_status == 'reassign') {
      this.setState({ validate_r_reason: '#FF0000' });
    } else {
      this.setState({ validate_r_reason: '#ebebeb' });
    }

    let valid = true;

    if (this.state.new_address == '') {
      valid = false;
    }

    if (this.state.edit_contract == 0) {
      valid = false;
    }

    if (this.state.edit_zone == 0 && this.state.order_type == 'regular') {
      valid = false;
    }

    if (
      (this.state.edit_surface == '0' || this.state.edit_service == '0' || this.state.edit_square_footage == '') &&
      this.state.edit_status == 'completed' &&
      this.state.order_type == 'regular'
    ) {
      valid = false;
    }

    if (this.state.edit_reason == '' && this.state.edit_status == 'closed') {
      valid = false;
    }

    if (this.state.edit_r_reason == '' && this.state.edit_status == 'reassign') {
      valid = false;
    }

    if (valid) {
      const user_id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('userToken');
      //const { params } = this.props.navigation.state;

      if (this.state.edit_local == 'true' || this.state.edit_local == 'new') {
        const local_orders = await AsyncStorage.getItem('orders_local_3');
        let new_local_orders = JSON.parse(local_orders);

        if (new_local_orders.orders.length == 0) {
          new_local_orders.orders = [];
        }
        if (Object.keys(new_local_orders.orders_survey).length == 0) {
          new_local_orders.orders_survey = [];
        }
        if (Object.keys(new_local_orders.orders_completed).length == 0) {
          new_local_orders.orders_completed = [];
        }

        let order_edit = [];

        if (this.state.new_params.type_order == 'open') {
          order_edit = new_local_orders.orders[this.state.new_params.key_order];
        }
        if (this.state.new_params.type_order == 'completed') {
          order_edit = new_local_orders.orders_completed[this.state.new_params.key_order];
        }
        if (this.state.new_params.type_order == 'survey') {
          order_edit = new_local_orders.orders_survey[this.state.new_params.key_order];
        }

        order_edit.tech_status = this.state.edit_status;
        order_edit.surface_id = this.state.edit_surface;
        order_edit.service_id = this.state.edit_service;
        order_edit.square_footage = this.state.edit_square_footage;
        order_edit.notes = this.state.edit_comment;
        order_edit.address = this.state.new_address;
        order_edit.contract_id = this.state.edit_contract;
        order_edit.zone_id = this.state.edit_zone;
        order_edit.priority = this.state.edit_priority;
        order_edit.before_images_local = this.state.b_image;
        order_edit.after_images_local = this.state.a_image;
        order_edit.notes_local = this.state.markers;

        if (order_edit.sync_status != 'new') {
          order_edit.sync_status = 'edit';
        }

        let info = 'false';

        if (this.state.edit_local == 'new' && order_edit.sync_status == 'new') {
          console.log('enter new here');

          let data_response = await API.new_order(
            user_id,
            token,
            order_edit.address,
            0,
            0,
            order_edit.contract_id,
            order_edit.zone_id,
            order_edit.tech_status,
            order_edit.new_notes,
            order_edit.surface_id,
            order_edit.service_id,
            order_edit.square_footage,
            order_edit.new_priority
          );
          console.log(data_response);

          if (data_response.message == 'invalid_login') {
          } else {
            this.setState({
              order_id_editing: data_response.order_id,
            });
            let correlative_n = 0;
            for (let before_image of this.state.b_image) {
              if (before_image.type == 'new') {
                let new_object = {
                  route: before_image.route,
                  correlative: correlative_n,
                  type: 'before',
                  uploaded: false,
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
                  uploaded: false,
                };
                var joined = this.state.images_to_upload.concat(new_object2);
                this.setState({ images_to_upload: joined });
              }
              correlative_n++;
            }

            if (this.state.images_to_upload.length > 0) {
              this.setState({
                modalVisible: true,
              });
              this.upload_image();
            } else {
              this.information_save();
              this.setState({ activity_indicator: false });
            }
          }

          order_edit.sync_status = 'none';
          order_edit.order_id = data_response.order_id;
        } else {
          info = 'true';
        }

        if (this.state.new_params.type_order != this.state.edit_status) {
          if (this.state.new_params.type_order == 'open') {
            new_local_orders.orders.splice(this.state.new_params.key_order, 1);
          }
          if (this.state.new_params.type_order == 'completed') {
            new_local_orders.orders_completed.splice(this.state.new_params.key_order, 1);
          }
          if (this.state.new_params.type_order == 'survey') {
            new_local_orders.orders_survey.splice(this.state.new_params.key_order, 1);
          }

          if (this.state.edit_status == 'open') {
            new_local_orders.orders.push(order_edit);
          }
          if (this.state.edit_status == 'survey') {
            new_local_orders.orders_survey.push(order_edit);
          }
          if (this.state.edit_status == 'completed') {
            new_local_orders.orders_completed.push(order_edit);
          }
        } else {
          if (this.state.new_params.type_order == 'open') {
            new_local_orders.orders[this.state.new_params.key_order] = order_edit;
          }
          if (this.state.new_params.type_order == 'completed') {
            new_local_orders.orders_completed[this.state.new_params.key_order] = order_edit;
          }
          if (this.state.new_params.type_order == 'survey') {
            new_local_orders.orders_survey[this.state.new_params.key_order] = order_edit;
          }
        }

        let new_local_orders_save = JSON.stringify(new_local_orders);
        await AsyncStorage.setItem('orders_local_3', new_local_orders_save);

        if (info == 'true') {
          this.information_save();
          this.setState({ activity_indicator: false });
        }
      } else {
        let data_response = await API.update_order(
          user_id,
          token,
          this.state.new_params.order_id,
          this.state.edit_status,
          this.state.edit_surface,
          this.state.edit_service,
          this.state.edit_square_footage,
          this.state.edit_comment,
          this.state.new_address,
          this.state.latitude_new,
          this.state.longitude_new,
          this.state.edit_contract,
          this.state.edit_zone,
          this.state.edit_priority,
          this.state.edit_reason,
          this.state.edit_r_reason
        );
        console.log(data_response);

        let correlative_n = 0;
        for (let before_image of this.state.b_image) {
          if (before_image.type == 'new') {
            let new_object = {
              route: before_image.route,
              correlative: correlative_n,
              type: 'before',
              uploaded: false,
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
              uploaded: false,
            };
            var joined = this.state.images_to_upload.concat(new_object2);
            this.setState({ images_to_upload: joined });
          }
          correlative_n++;
        }

        console.log(this.state.images_to_upload);
        if (this.state.images_to_upload.length > 0) {
          this.setState({
            modalVisible: true,
          });
          this.upload_image();
        } else {
          this.information_save();
          this.setState({ activity_indicator: false });
        }
      }
    } else {
      this.setState({
        modal_validate: true,
      });
      this.scrollToTop();
      this.setState({ activity_indicator: false });
    }
  };

  save_new_note = async () => {
    if (this.state.edit_local == 'true' || this.state.edit_local == 'new') {
      const user_id = await AsyncStorage.getItem('user_id');
      let a;
      a = this.state.markers;
      let i = 0;
      let e = 0;

      a.push({
        note: this.state.new_note,
        user_note: 'Tech Note By ' + this.state.username + ':',
        user_note_id: user_id,
        date: 'N/A',
        note_status: 'new',
      });

      this.setState({ last_note: this.state.new_note });

      this.setState({ markers: a });
      this.setState({
        new_note: '',
      });
    } else {
      const user_id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('userToken');
      //const { params } = this.props.navigation.state;
      let data_response = await API.new_note(user_id, token, this.state.new_params.order_id, this.state.new_note);
      console.log(data_response);
      if (data_response.message == 'save') {
        //this._getDetails();

        let a;
        a = this.state.markers;

        a.push({
          note: this.state.new_note,
          user_note: 'Tech Note By ' + this.state.username + ':',
          user_note_id: user_id,
          date: 'N/A',
          note_status: 'new',
        });

        this.setState({ markers: a });
      }
      this.setState({
        new_note: '',
      });
    }
  };

  upload_image = async () => {
    /*
  let count_images =  this.state.images_to_upload.length;
  if(this.state.current_updating < count_images ){
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    const { params } = this.props.navigation.state;
    console.log(this.state.images_to_upload[this.state.current_updating].route);
    let data_response =  await API.upload_img(user_id,token,this.state.order_id_editing,this.state.images_to_upload[this.state.current_updating].route,this.state.images_to_upload[this.state.current_updating].correlative,this.state.images_to_upload[this.state.current_updating].type);
    console.log(data_response);
    if(data_response.message == 'successfully'){
       let new_img = this.state.current_updating + 1;
       this.setState({
        current_updating: new_img,
       });
       if(this.state.modalVisible){
         this.upload_image();
       }       
    }else{
      console.log("error");
    }
  }else{
    this.setState({
      modalVisible: false,
      images_to_upload: [],
    });    
    this.information_save();
    this.setState({ activity_indicator : false });
  }
  */

    console.log('enter up');

    let count_images = this.state.images_to_upload.length;

    if (this.state.current_updating < count_images) {
      let message = '';
      let c_date = '';

      const user_id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('userToken');
      let count = 1;
      let images_new = this.state.images_to_upload;
      for (let item_upload of this.state.images_to_upload) {
        if (!item_upload.uploaded) {
          var date = new Date().getDate(); //Current Date
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
          var hours = new Date().getHours(); //Current Hours
          var min = new Date().getMinutes(); //Current Minutes
          var sec = new Date().getSeconds(); //Current Seconds

          c_date = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

          this.setState({ message_upload: this.state.message_upload + '\n image ' + count + ' start : ' + c_date });

          try {
            let data_response = await API.upload_img(user_id, token, this.state.order_id_editing, item_upload.route, item_upload.correlative, item_upload.type);

            if (data_response.message == 'successfully') {
              var date = new Date().getDate(); //Current Date
              var month = new Date().getMonth() + 1; //Current Month
              var year = new Date().getFullYear(); //Current Year
              var hours = new Date().getHours(); //Current Hours
              var min = new Date().getMinutes(); //Current Minutes
              var sec = new Date().getSeconds(); //Current Seconds

              c_date = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
              this.setState({ message_upload: this.state.message_upload + '\n image ' + count + ' end : ' + c_date });
              images_new[count - 1].uploaded = true;

              let new_img = this.state.current_updating + 1;
              this.setState({
                current_updating: new_img,
              });
            }
          } catch (error) {
            //speed = 0;
            //this.setState({ test : 0 });
            console.error(error);
            this.setState({ message_upload: this.state.message_upload + '\n error: ' + error });
          }
        }
        count++;
      }

      this.setState({
        images_to_upload: images_new,
      });

      if (this.state.modalVisible) {
        setTimeout(() => {
          this.upload_image();
        }, 3000);
      }
    } else {
      console.log('enter up out');

      this.setState({
        modalVisible: false,
        images_to_upload: [],
      });
      this.information_save();
      this.setState({ activity_indicator: false });
    }
  };

  cancel_upload = async () => {
    this.setState({
      modalVisible: false,
      images_to_upload: [],
    });
    this.setState({ activity_indicator: false });
  };

  cancel_validate = async () => {
    this.setState({
      modal_validate: false,
    });
  };
  information_save = async () => {
    this.setState({
      modal2Visible: true,
    });

    let new_params = {
      update: '1',
    };
    await AsyncStorage.setItem('current_params', JSON.stringify(new_params));

    setTimeout(() => {
      this.setState({ modal2Visible: false });
      let edit_status = this.state.edit_status;

      //const { params } = this.props.navigation.state;
      console.log('page :' + this.state.new_params.page);
      if (this.state.new_params.page == 'map') {
        this.props.navigation.navigate('Home', { update: '1' });
      } else {
        this.props.navigation.navigate('List', { update: '1' });
      }
    }, 3000);
  };

  handleGetDirections = () => {
    console.log(this.state.des_lat);
    console.log(this.state.des_log);
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
    console.log(data);
    getDirections(data);
  };

  open_edit = () => {
    this.setState({
      modal3Visible: true,
    });
  };

  close_edit = () => {
    this.setState({
      modal3Visible: false,
    });
  };

  pre_open_image = (key) => {
    this.setState({
      b_currect_img: key,
    });
    this.setState({
      modalImage: true,
    });
  };

  pre_open_image_a = (key) => {
    this.setState({
      a_currect_img: key,
    });
    this.setState({
      modalImage2: true,
    });
  };

  open_image = () => {
    this.setState({
      modalImage: true,
    });
  };

  close_image = () => {
    this.setState({
      modalImage: false,
    });
  };

  open_image2 = () => {
    this.setState({
      modalImage2: true,
    });
  };

  close_image2 = () => {
    this.setState({
      modalImage2: false,
    });
  };

  save_comment = () => {
    this.setState({
      modal3Visible: false,
      edit_comment: this.state.new_comment,
    });

    this.setState({
      new_comment: '',
    });
  };

  open_note = () => {
    this.setState({
      modal4Visible: true,
    });
  };

  close_note = () => {
    this.setState({
      modal4Visible: false,
    });
  };

  save_note = () => {
    this.setState({
      modal4Visible: false,
    });
    this.save_new_note();
  };

  open_select_upload = () => {
    this.setState({
      modal_select_upload: true,
    });
  };

  close_select_upload = () => {
    this.setState({
      modal_select_upload: false,
    });
  };

  open_map = async () => {
    //const { params } = this.props.navigation.state;

    let new_params = {
      order_id: this.state.new_params.order_id,
      page: 'details',
      lat: this.state.latitude_new,
      long: this.state.longitude_new,
    };
    await AsyncStorage.setItem('current_params', JSON.stringify(new_params));

    this.props.navigation.navigate('Map', {
      order_id: this.state.new_params.order_id,
      page: 'details',
      lat: this.state.latitude_new,
      long: this.state.longitude_new,
    });
  };

  onValueChange(value) {
    this.setState({
      edit_contract: value,
      edit_zone: 0,
    });
    this._get_zone_ofline();
  }

  change_status(itemValue) {
    this.setState({ show_reason: false });
    this.setState({ show_r_reason: false });

    this.setState({ edit_status: itemValue });
    if (this.state.actual_status == 'open') {
      if (itemValue == 'open') {
        this.setState({ text_btn: 'Save Changes' });
      }
      if (itemValue == 'survey') {
        this.setState({ text_btn: 'Convert To Survey' });
      }
      if (itemValue == 'completed') {
        this.setState({ text_btn: 'Complete Order' });
      }
      if (itemValue == 'reassign') {
        this.setState({ text_btn: 'Reassign Order' });
        this.setState({ show_r_reason: true });
      }
      if (itemValue == 'closed') {
        this.setState({ text_btn: 'Close Order' });
        this.setState({ show_reason: true });
      }
    }
    if (this.state.actual_status == 'completed') {
      if (itemValue == 'open') {
        this.setState({ text_btn: 'Re Open Order' });
      }
      if (itemValue == 'survey') {
        this.setState({ text_btn: 'Convert To Survey' });
      }
      if (itemValue == 'completed') {
        this.setState({ text_btn: 'Save Changes' });
      }
      if (itemValue == 'reassign') {
        this.setState({ text_btn: 'Reassign Order' });
        this.setState({ show_r_reason: true });
      }
      if (itemValue == 'closed') {
        this.setState({ text_btn: 'Close Order' });
        this.setState({ show_reason: true });
      }
    }
    if (this.state.actual_status == 'survey') {
      if (itemValue == 'open') {
        this.setState({ text_btn: 'Convert To Open' });
      }
      if (itemValue == 'survey') {
        this.setState({ text_btn: 'Save Changes' });
      }
      if (itemValue == 'completed') {
        this.setState({ text_btn: 'Complete Order' });
      }
      if (itemValue == 'closed') {
        this.setState({ text_btn: 'Close Order' });
        this.setState({ show_reason: true });
      }
    }
  }

  onPress_back = () => {
    Keyboard.dismiss();
  };

  close_qf = () => {
    this.setState({
      square_footage_r: 0,
      square_footage_w: '',
      square_footage_h: '',
      modal_square: false,
    });
  };

  save_qf = () => {
    this.setState({
      edit_square_footage: String(this.state.square_footage_r),
    });
    this.setState({
      square_footage_r: 0,
      square_footage_w: '',
      square_footage_h: '',
      modal_square: false,
    });
  };
  render() {
    return (
      <SafeAreaView style={[container.container]}>
        <Modal style={{ margin: 0 }} animationType='slide' transparent={true} visible={this.state.modal_square}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: '80%',
                height: 300,
                marginBottom: Platform.OS === 'ios' ? '50%' : '1%',
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
              <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                <Text style={{ fontFamily: 'Roboto', width: '100%' }}>Width (Ft)</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                <View
                  style={{
                    borderColor: '#ebebeb',
                    borderStartWidth: 1,
                    borderEndWidth: 1,
                    borderTopWidth: 1,
                    boderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    flex: 1,
                    marginHorizontal: 8,
                  }}
                >
                  <TextInput
                    style={{ width: '100%', height: 30, backgroundColor: '#f0f0f0' }}
                    paddingRight={12}
                    paddingLeft={12}
                    keyboardType='number-pad'
                    value={this.state.square_footage_w}
                    onChangeText={(itemValue, itemIndex) => this.setState({ square_footage_w: itemValue, square_footage_r: itemValue * this.state.square_footage_h })}
                  ></TextInput>
                </View>
              </View>

              <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                <Text style={{ fontFamily: 'Roboto', width: '100%' }}>Height (Ft)</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                <View
                  style={{
                    borderColor: '#ebebeb',
                    borderStartWidth: 1,
                    borderEndWidth: 1,
                    borderTopWidth: 1,
                    boderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    flex: 1,
                    marginHorizontal: 8,
                  }}
                >
                  <TextInput
                    style={{ width: '100%', height: 30, backgroundColor: '#f0f0f0' }}
                    paddingRight={12}
                    paddingLeft={12}
                    keyboardType='number-pad'
                    value={this.state.square_footage_h}
                    onChangeText={(itemValue, itemIndex) => this.setState({ square_footage_h: itemValue, square_footage_r: itemValue * this.state.square_footage_w })}
                  ></TextInput>
                </View>
              </View>

              <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                <Text style={{ fontFamily: 'Roboto', width: '100%' }}>Square Footage (auto) </Text>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                <View
                  style={{
                    borderColor: '#ebebeb',
                    borderStartWidth: 1,
                    borderEndWidth: 1,
                    borderTopWidth: 1,
                    boderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    flex: 1,
                    marginHorizontal: 8,
                  }}
                >
                  <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                    {this.state.square_footage_r}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={this.close_qf} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginRight: 16, marginTop: 6, marginVertical: 15 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save_qf} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal style={{ margin: 0 }} animationType='slide' transparent={true} visible={this.state.modal3Visible}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View
                style={{
                  width: '100%',
                  height: 115,
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
                <TextInput
                  style={{
                    borderColor: Color.steel,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    fontSize: 18,
                    marginVertical: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 7,
                    fontFamily: 'Roboto',
                    marginHorizontal: 8,
                  }}
                  value={this.state.new_comment}
                  onChangeText={(itemValue, itemIndex) => this.setState({ new_comment: itemValue })}
                  autoFocus={true}
                  placeholderTextColor={Color.steel}
                  placeholder=''
                  underlineColorAndroid={'transparent'}
                  keyboardType='default'
                />
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={this.close_edit} style={{ textAlign: 'right' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginRight: 16, marginTop: 6, marginVertical: 15 }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.save_comment} style={{ textAlign: 'right' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
        <Modal style={{ margin: 0 }} animationType='slide' transparent={true} visible={this.state.modal4Visible}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: '80%',
                height: 115,
                marginBottom: Platform.OS === 'ios' ? '50%' : '1%',
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
              <TextInput
                style={{
                  borderColor: Color.steel,
                  borderWidth: 0.5,
                  borderRadius: 5,
                  fontSize: 18,
                  marginVertical: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  fontFamily: 'Roboto',
                  marginHorizontal: 8,
                }}
                value={this.state.new_note}
                onChangeText={(itemValue, itemIndex) => this.setState({ new_note: itemValue })}
                autoFocus={true}
                placeholderTextColor={Color.steel}
                placeholder=''
                underlineColorAndroid={'transparent'}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={this.close_note} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginRight: 16, marginTop: 6, marginVertical: 15 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save_note} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal style={{ margin: 0 }} animationType='slide' transparent={true} visible={this.state.modal_select_upload}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: '100%',
                height: 115,
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
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={this._pickImage} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginRight: 16, marginTop: 6, marginVertical: 15 }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._pickImage_galery} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }}>Galery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType='slide' transparent={true} visible={this.state.modal_confirm_delete}>
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
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Are you sure you want to delete picture ?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 50 }}>
                <TouchableOpacity onPress={this.cancel_delete_img} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginRight: 16, marginTop: 6, marginVertical: 15 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.remove_img} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType='slide' transparent={true} visible={this.state.modal_confirm_delete_a}>
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
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Are you sure you want to delete picture ?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 70 }}>
                <TouchableOpacity onPress={this.cancel_delete_img_a} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginRight: 16, marginTop: 6, marginVertical: 15 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.remove_img_a} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red', marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal style={{ margin: 0 }} animationType='slide' transparent={true} visible={this.state.modalImage}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              {this.state.b_show_image && (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={width}
                    imageHeight={height - height / 2}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={{ uri: this.state.b_image[this.state.b_currect_img].route }} style={{ width: width, aspectRatio: 1, resizeMode: 'contain' }} />
                  </ImageZoom>
                </View>
              )}

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                }}
                onPress={() => this.close_image()}
              >
                <Image
                  source={require('../../Image/menu_7.png')}
                  style={{
                    width: 55,
                    height: 55,
                    marginTop: this.state.margin_close,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal style={{ margin: 0 }} animationType='slide' transparent={true} visible={this.state.modalImage2}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}
            >
              {this.state.a_show_image && (
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ImageZoom
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={width}
                    imageHeight={height - height / 2}
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={{ uri: this.state.a_image[this.state.a_currect_img].route }} style={{ width: width, aspectRatio: 1, resizeMode: 'contain' }} />
                  </ImageZoom>
                </View>
              )}

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                }}
                onPress={() => this.close_image2()}
              >
                <Image
                  source={require('../../Image/menu_7.png')}
                  style={{
                    width: 55,
                    height: 55,
                    marginTop: this.state.margin_close,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={{ marginRight: 10, marginTop: 10, marginBottom: 5 }} onPress={this.back}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 2,
              marginTop: 10,
            }}
          >
            <Image
              source={require('../../Image/back.png')}
              style={{
                width: 20,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
        </TouchableOpacity>
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
            heading='OVERVIEW'
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
            <Modal animationType='slide' transparent={true} visible={this.state.modalVisible}>
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
                  <Text style={{ textAlign: 'center', marginTop: 10 }}>Uploading Images</Text>
                  <Text style={{ textAlign: 'center' }}>
                    {this.state.current_updating} of {this.state.images_to_upload.length}{' '}
                  </Text>

                  <Button Text='Cancel' onPress={this.cancel_upload} textStyle={{ fontFamily: 'uber', fontSize: 16 }} viewStyle={{ marginBottom: 20 }} />
                </View>
              </View>
            </Modal>
            <Modal animationType='slide' transparent={true} visible={this.state.modal2Visible}>
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
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ textAlign: 'center', marginTop: 10 }}>Information Saved Successfully</Text>
                  <Image
                    source={require('../../Image/checked.png')}
                    style={{
                      width: 52,
                      height: 46,
                      marginTop: 30,
                    }}
                  />
                </View>
              </View>
            </Modal>
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
                  <Text style={{ textAlign: 'center', marginTop: 10 }}>You must enter all required fields in order to continue.</Text>
                  <Button Text='Close' onPress={this.cancel_validate} textStyle={{ fontFamily: 'uber', fontSize: 16 }} viewStyle={{ marginBottom: 20 }} />
                </View>
              </View>
            </Modal>
            <ScrollView
              ref={(scroller) => {
                this.scroller = scroller;
              }}
              keyboardShouldPersistTaps='handled'
              style={{ flex: 0.85 }}
            >
              <TouchableWithoutFeedback onPress={this.onPress_back}>
                <List style={{ marginVertical: 20, marginHorizontal: 15 }}>
                  {this.state.order_type == 'regular' && this.state.show_address == true && this.state.is_conected == 'true' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <GooglePlacesAutocomplete
                        key={this.state.address_from}
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={true}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        //listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        enableHighAccuracyLocation={true}
                        value={this.state.address_from}
                        renderDescription={(row) => row.description} // custom description render
                        onPress={(data, details = null) => {
                          // 'details' is provided when fetchDetails = true
                          console.log(data);

                          this.setState({ new_address: data.description });
                          this.get_zone(details);
                          this.setState({
                            address_edit: '1',
                          });
                        }}
                        listViewDisplayed={this.state.showPlacesList}
                        textInputProps={{
                          onFocus: () => this.setState({ showPlacesList: true }),
                          onBlur: () => this.setState({ showPlacesList: false }),
                          onChangeText: (text) => {
                            this.setState({ new_address: text });
                          },
                        }}
                        getDefaultValue={() => this.state.address_from}
                        query={{
                          // available options: https://developers.google.com/places/web-service/autocomplete
                          key: 'AIzaSyBGkMG-nj0pgK1ruZRZUdLW-7SgSkmqQfQ',
                          language: 'en', // language of the results
                          types: 'address',
                          components: 'country:us',
                        }}
                        GooglePlacesSearchQuery={{
                          rankby: 'distance',
                          type: 'address',
                        }}
                        renderRow={(row) => {
                          console.log(row);
                          return row.structured_formatting.main_text ? (
                            <Text style={{ flexDirection: 'row', height: 150 }}>
                              <Text style={{ fontSize: this.state.font1 }}>
                                {row.structured_formatting.main_text}
                                {'\n'}
                              </Text>
                              <Text style={{ color: '#808080', fontSize: this.state.font2 }}>{row.structured_formatting.secondary_text}</Text>
                            </Text>
                          ) : (
                            row.vicinity
                          );
                        }}
                        styles={{
                          textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                          },
                          textInput: {
                            backgroundColor: '#f0f0f0',
                            borderColor: this.state.validate_address,
                            borderWidth: 1,
                            borderRadius: 0,
                            fontFamily: 'Roboto',
                            height: 35,
                          },
                          container: {
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb',
                          },
                          poweredContainer: {
                            height: 90,
                            color: '#5d5d5d',
                            fontSize: 16,
                          },
                          row: {
                            height: this.state.h_autocomplete,
                          },
                        }}
                        currentLocationLabel='Current location'
                        nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={
                          {
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                          }
                        }
                        // filterReverseGeocodingByTypes={[
                        //   'locality',
                        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        debounce={200}
                      />
                    </View>
                  )}
                  {this.state.order_type == 'regular' && this.state.show_address == true && this.state.is_conected == 'false' && (
                    <View>
                      <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <View
                          style={{
                            fontFamily: 'Roboto',
                            borderColor: this.state.validate_square,
                            borderStartWidth: 1,
                            borderEndWidth: 1,
                            borderTopWidth: 1,
                            boderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            flex: 1,
                            marginHorizontal: 8,
                            backgroundColor: '#f0f0f0',
                          }}
                        >
                          <TextInput
                            style={{ width: '100%', height: 30 }}
                            paddingRight={12}
                            paddingLeft={12}
                            autoFocus={true}
                            value={this.state.address_from}
                            onChangeText={(itemValue, itemIndex) => this.setState({ address_from: itemValue })}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                  )}
                  {this.state.order_type == 'regular' && this.state.show_address == false && (
                    <View style={{ flexDirection: 'row', paddingTop: 16, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: '#ebebeb',
                          borderStartWidth: 1,
                          backgroundColor: '#f0f0f0',
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                        }}
                      >
                        <Text
                          onPress={() => {
                            this.change_address_text();
                          }}
                          style={{ paddingHorizontal: 8, paddingVertical: 6, paddingRight: 30 }}
                        >
                          {this.state.address_from}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            this.change_address_btn();
                          }}
                          style={{ position: 'absolute', top: 5, right: 10 }}
                        >
                          <Text style={{ fontSize: 17 }}>X</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  {this.state.order_type == 'regular' && this.state.is_conected == 'true' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.open_map();
                        }}
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          textAlign: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          shadowColor: '#000',
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.2,
                          shadowRadius: 1.41,
                          elevation: 5,
                          marginHorizontal: 8,
                          paddingVertical: 8,
                        }}
                      >
                        <Image style={style.icon_image} source={require('../../Image/icon2.png')} />
                        <Text style={{ fontFamily: 'Roboto', paddingTop: 2 }}>Update Address On Map</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {this.state.order_type == 'transit' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: '#ebebeb',
                          borderStartWidth: 1,
                          backgroundColor: '#f0f0f0',
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                        }}
                      >
                        <Text style={{ paddingHorizontal: 8, paddingVertical: 6 }}>{this.state.order_data.address}</Text>
                      </View>
                    </View>
                  )}
                  {this.state.is_conected == 'true' && (
                    <Button
                      Text='Start Navigation'
                      onPress={this.handleGetDirections}
                      textStyle={{ fontFamily: 'Roboto', fontSize: 16 }}
                      viewStyle={{ marginBottom: 20, backgroundColor: '#4385F4' }}
                    />
                  )}

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>ID</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View
                      style={{
                        fontFamily: 'Roboto',
                        borderColor: '#ebebeb',
                        borderStartWidth: 1,
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        flex: 1,
                        marginHorizontal: 8,
                        backgroundColor: '#fff',
                      }}
                    >
                      <Text style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                        {this.state.order_data.contract_code}-{this.state.order_data.order_id}{' '}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Contract</Text>
                  </View>
                  {this.state.order_type == 'regular' && this.state.address_edit == '1' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: this.state.validate_contract,
                          borderStartWidth: 1,
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                          backgroundColor: '#f0f0f0',
                        }}
                      >
                        <SelectDropdown
                          key={this.state.index_contract}
                          data={this.state.contracts}
                          defaultValueByIndex={this.state.index_contract}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            //citiesDropdownRef.current.reset();
                            //setCities([]);
                            //setCities(selectedItem.cities);
                            this.onValueChange(selectedItem.contract_id, index);
                          }}
                          defaultButtonText={'Select'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.contract_name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.contract_name;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={(isOpened) => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                      </View>
                    </View>
                  )}
                  {(this.state.order_type == 'transit' || this.state.address_edit == '0') && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: '#ebebeb',
                          borderStartWidth: 1,
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                          backgroundColor: '#fff',
                        }}
                      >
                        <Text style={{ paddingHorizontal: 8, paddingVertical: 6 }}>{this.state.order_data.contract_name}</Text>
                      </View>
                    </View>
                  )}
                  {this.state.order_type == 'transit' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                      <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Route</Text>
                    </View>
                  )}
                  {this.state.order_type == 'transit' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: '#ebebeb',
                          borderStartWidth: 1,
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                          backgroundColor: '#fff',
                        }}
                      >
                        <Text style={{ paddingHorizontal: 8, paddingVertical: 6 }}>{this.state.order_data.route}</Text>
                      </View>
                    </View>
                  )}

                  {this.state.order_type == 'regular' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                      <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Zone</Text>
                    </View>
                  )}
                  {this.state.order_type == 'regular' && this.state.address_edit == '0' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: '#ebebeb',
                          borderStartWidth: 1,
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                          backgroundColor: '#fff',
                        }}
                      >
                        <Text style={{ paddingHorizontal: 8, paddingVertical: 6 }}>{this.state.order_data.zone_name}</Text>
                      </View>
                    </View>
                  )}
                  {this.state.order_type == 'regular' && this.state.address_edit == '1' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: this.state.validate_zone,
                          borderStartWidth: 1,
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                          backgroundColor: '#f0f0f0',
                        }}
                      >
                        <SelectDropdown
                          key={this.state.index_zone}
                          data={this.state.zones}
                          defaultValueByIndex={this.state.index_zone}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            //citiesDropdownRef.current.reset();
                            //setCities([]);
                            //setCities(selectedItem.cities);
                            this.setState({ edit_zone: selectedItem.zone_id });
                          }}
                          defaultButtonText={'Select'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.zone_name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.zone_name;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={(isOpened) => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                      </View>
                    </View>
                  )}
                  {this.state.order_type == 'regular' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                      <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Request Comment</Text>
                    </View>
                  )}
                  {this.state.order_type == 'regular' && (
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          fontFamily: 'Roboto',
                          borderColor: '#ebebeb',
                          borderStartWidth: 1,
                          borderEndWidth: 1,
                          borderTopWidth: 1,
                          boderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          flex: 1,
                          marginHorizontal: 8,
                          backgroundColor: '#fff',
                        }}
                      >
                        {this.state.edit_comment != '' && (
                          <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                            {this.state.edit_comment}{' '}
                          </Text>
                        )}
                        {this.state.edit_comment == '' && (
                          <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                            No Comment Added
                          </Text>
                        )}
                      </View>
                    </View>
                  )}
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Notes</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View
                      style={{
                        fontFamily: 'Roboto',
                        borderColor: '#ebebeb',
                        borderStartWidth: 1,
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        flex: 1,
                        marginHorizontal: 8,
                        backgroundColor: '#fff',
                      }}
                    >
                      {this.state.last_note != '' && (
                        <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                          {this.state.last_note}{' '}
                        </Text>
                      )}
                      {this.state.last_note == '' && (
                        <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                          No Note Added
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Request Comment</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View
                      style={{
                        fontFamily: 'Roboto',
                        borderColor: '#ebebeb',
                        borderStartWidth: 1,
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        flex: 1,
                        marginHorizontal: 8,
                        backgroundColor: '#fff',
                      }}
                    >
                      {this.state.r_comment != '' && (
                        <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                          {this.state.r_comment}{' '}
                        </Text>
                      )}
                      {this.state.r_comment == '' && (
                        <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                          No Request Comment Added
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Surface</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View
                      style={{
                        fontFamily: 'Roboto',
                        borderColor: this.state.validate_surface,
                        borderStartWidth: 1,
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        flex: 1,
                        marginHorizontal: 8,
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      <SelectDropdown
                        data={this.state.surfaces}
                        defaultValueByIndex={this.state.index_surface}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                          //citiesDropdownRef.current.reset();
                          //setCities([]);
                          //setCities(selectedItem.cities);
                          this.setState({ edit_surface: selectedItem.surface_id });
                        }}
                        defaultButtonText={'Select'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem.surface_name;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item.surface_name;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={(isOpened) => {
                          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Service</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View
                      style={{
                        fontFamily: 'Roboto',
                        borderColor: this.state.validate_service,
                        borderStartWidth: 1,
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        flex: 1,
                        marginHorizontal: 8,
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      <SelectDropdown
                        data={this.state.services}
                        defaultValueByIndex={this.state.index_service}
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                          //citiesDropdownRef.current.reset();
                          //setCities([]);
                          //setCities(selectedItem.cities);
                          this.setState({ edit_service: selectedItem.service_id });
                        }}
                        defaultButtonText={'Select'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem.service_name;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item.service_name;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={(isOpened) => {
                          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '50%', fontWeight: 'bold' }}>Square Footage</Text>
                    <View style={{ fontFamily: 'Roboto', width: '50%', fontWeight: 'bold', textAlign: 'right' }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ modal_square: true });
                        }}
                      >
                        <Text style={{ fontFamily: 'Roboto', textAlign: 'right', fontWeight: 'bold' }}>Calculator</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View
                      style={{
                        fontFamily: 'Roboto',
                        borderColor: this.state.validate_square,
                        borderStartWidth: 1,
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        flex: 1,
                        marginHorizontal: 8,
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      <TextInput
                        style={{ width: '100%', height: 30 }}
                        paddingRight={12}
                        paddingLeft={12}
                        keyboardType='numeric'
                        value={this.state.edit_square_footage}
                        onChangeText={(itemValue, itemIndex) => this.setState({ edit_square_footage: itemValue })}
                      ></TextInput>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, marginHorizontal: 8 }}>
                    <View style={{ width: '100%' }}>
                      <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', fontWeight: 'bold' }}>Before</Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                          <Button
                            Text={'CAMERA'}
                            onPress={this._pickImage}
                            textStyle={{ fontFamily: 'Roboto', fontSize: 14, color: '#000000' }}
                            viewStyle={{ color: '#000000', marginBottom: 20, backgroundColor: '#f0f0f0', height: 45 }}
                          />
                        </View>
                        <View style={{ width: '50%' }}>
                          <Button
                            Text={'GALLERY'}
                            onPress={this._pickImage_galery}
                            textStyle={{ fontFamily: 'Roboto', fontSize: 14, color: '#000000' }}
                            viewStyle={{ color: '#000000', marginBottom: 20, backgroundColor: '#f0f0f0', height: 45 }}
                          />
                        </View>
                      </View>
                      {this.state.b_image.map((b_image_item, key) => (
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: '40%', justifyContent: 'center' }}>
                            <Button
                              Text={'DELETE'}
                              onPress={() => {
                                this.pre_remove_img_btn(key);
                              }}
                              textStyle={{ fontFamily: 'Roboto', fontSize: 14, color: '#000000' }}
                              viewStyle={{ color: '#000000', marginBottom: 20, backgroundColor: '#f0f0f0', height: 45 }}
                            />
                          </View>
                          <View style={{ width: '60%' }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.pre_open_image(key);
                              }}
                            >
                              <Image source={{ uri: b_image_item.route }} style={{ width: '100%', height: 100, marginTop: 10, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, marginHorizontal: 8 }}>
                    <View style={{ width: '100%' }}>
                      <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={{ width: '40%', fontWeight: 'bold' }}>After</Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                          <Button
                            Text={'CAMERA'}
                            onPress={this._pickImage_a}
                            textStyle={{ fontFamily: 'Roboto', fontSize: 14, color: '#000000' }}
                            viewStyle={{ color: '#000000', marginBottom: 20, backgroundColor: '#f0f0f0', height: 45 }}
                          />
                        </View>
                        <View style={{ width: '50%' }}>
                          <Button
                            Text={'GALLERY'}
                            onPress={this._pickImage_galery_a}
                            textStyle={{ fontFamily: 'Roboto', fontSize: 14, color: '#000000' }}
                            viewStyle={{ color: '#000000', marginBottom: 20, backgroundColor: '#f0f0f0', height: 45 }}
                          />
                        </View>
                      </View>
                      {this.state.a_image.map((a_image_item, key) => (
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: '40%', justifyContent: 'center' }}>
                            <Button
                              Text={'DELETE'}
                              onPress={() => {
                                this.pre_remove_img_btn_a(key);
                              }}
                              textStyle={{ fontFamily: 'Roboto', fontSize: 14, color: '#000000' }}
                              viewStyle={{ color: '#000000', marginBottom: 20, backgroundColor: '#f0f0f0', height: 45 }}
                            />
                          </View>
                          <View style={{ width: '60%' }}>
                            <TouchableOpacity
                              onPress={() => {
                                this.pre_open_image_a(key);
                              }}
                            >
                              <Image source={{ uri: a_image_item.route }} style={{ width: '100%', height: 100, marginTop: 10, resizeMode: 'cover' }} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                    <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Status</Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                    <View
                      style={{
                        fontFamily: 'Roboto',
                        borderColor: '#ebebeb',
                        borderStartWidth: 1,
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        flex: 1,
                        marginHorizontal: 8,
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      {this.state.actual_status != 'survey' && this.state.order_type == 'regular' && (
                        <SelectDropdown
                          data={[
                            { name: 'Open', value: 'open' },
                            { name: 'Complete', value: 'completed' },
                            { name: 'Survey', value: 'survey' },
                            { name: 'Reassign', value: 'reassign' },
                            { name: 'Closed', value: 'closed' },
                          ]}
                          defaultValueByIndex={this.state.default_1}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            //citiesDropdownRef.current.reset();
                            //setCities([]);
                            //setCities(selectedItem.cities);
                            this.change_status(selectedItem.value);
                          }}
                          defaultButtonText={'Select'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.name;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={(isOpened) => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                      )}
                      {this.state.actual_status == 'survey' && this.state.order_type == 'regular' && (
                        <SelectDropdown
                          data={[
                            { name: 'Open', value: 'open' },
                            { name: 'Complete', value: 'completed' },
                            { name: 'Survey', value: 'survey' },
                          ]}
                          defaultValueByIndex={this.state.default_1}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            //citiesDropdownRef.current.reset();
                            //setCities([]);
                            //setCities(selectedItem.cities);
                            this.change_status(selectedItem.value);
                          }}
                          defaultButtonText={'Select'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.name;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={(isOpened) => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                      )}
                      {this.state.order_type == 'transit' && (
                        <SelectDropdown
                          data={[
                            { name: 'Open', value: 'open' },
                            { name: 'Complete', value: 'completed' },
                            { name: 'Closed', value: 'closed' },
                          ]}
                          defaultValueByIndex={this.state.default_1}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            //citiesDropdownRef.current.reset();
                            //setCities([]);
                            //setCities(selectedItem.cities);
                            this.change_status(selectedItem.value);
                          }}
                          defaultButtonText={'Select'}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                          }}
                          rowTextForSelection={(item, index) => {
                            return item.name;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={(isOpened) => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                          }}
                          dropdownIconPosition={'right'}
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                      )}
                    </View>
                  </View>
                  {this.state.show_reason == true && (
                    <View>
                      <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                        <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Reason:</Text>
                      </View>
                      <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <View
                          style={{
                            fontFamily: 'Roboto',
                            borderColor: this.state.validate_reason,
                            borderStartWidth: 1,
                            borderEndWidth: 1,
                            borderTopWidth: 1,
                            boderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            flex: 1,
                            marginHorizontal: 8,
                            backgroundColor: '#f0f0f0',
                          }}
                        >
                          <Picker
                            style={{ width: '100%', height: 30 }}
                            iosHeader='Select one'
                            mode='dropdown'
                            selectedValue={this.state.edit_reason}
                            onValueChange={(itemValue, itemIndex) => this.setState({ edit_reason: itemValue })}
                          >
                            <Item label='Select' value='' />
                            <Item label='DBO' value='DBO' />
                            <Item label='NG' value='NG' />
                            <Item label='DMG' value='DMG' />
                            <Item label='DUP' value='DUP' />
                            <Item label='NSA' value='NSA' />
                            <Item label='OOA' value='OOA' />
                            <Item label='Other' value='Other' />
                          </Picker>
                        </View>
                      </View>
                    </View>
                  )}

                  {this.state.show_r_reason == true && (
                    <View>
                      <View style={{ flexDirection: 'row', paddingTop: 10, paddingHorizontal: 8 }}>
                        <Text style={{ fontFamily: 'Roboto', width: '100%', fontWeight: 'bold' }}>Reassign Reason:</Text>
                      </View>
                      <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <View
                          style={{
                            fontFamily: 'Roboto',
                            borderColor: this.state.validate_r_reason,
                            borderStartWidth: 1,
                            borderEndWidth: 1,
                            borderTopWidth: 1,
                            boderLeftWidth: 1,
                            borderRightWidth: 1,
                            borderBottomWidth: 1,
                            flex: 1,
                            marginHorizontal: 8,
                            backgroundColor: '#f0f0f0',
                          }}
                        >
                          <TextInput
                            style={{ width: '100%', height: 30 }}
                            paddingRight={12}
                            paddingLeft={12}
                            value={this.state.edit_r_reason}
                            onChangeText={(itemValue, itemIndex) => this.setState({ edit_r_reason: itemValue })}
                          ></TextInput>
                        </View>
                      </View>
                    </View>
                  )}
                </List>
              </TouchableWithoutFeedback>
              {this.state.activity_indicator == false && (
                <View style={{ flex: 0.15, marginHorizontal: 8 }}>
                  <Button
                    Text={this.state.text_btn}
                    onPress={this.submit_info}
                    textStyle={{ fontFamily: 'Roboto', fontSize: 15 }}
                    viewStyle={{ marginBottom: 20, backgroundColor: '#727cf5', height: 50 }}
                  />
                </View>
              )}
              {this.state.activity_indicator == true && (
                <View style={{ flex: 0.15, marginHorizontal: 8 }}>
                  <View
                    style={{
                      marginBottom: 20,
                      backgroundColor: '#727cf5',
                      justifyContent: 'center',
                      margin: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 2,
                      height: 45,
                    }}
                  >
                    <ActivityIndicator size='small' color='#FFFFFF' />
                  </View>
                </View>
              )}
            </ScrollView>
            <HideWithKeyboard style={{ flex: 0.07, width: '100%', textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
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
            </HideWithKeyboard>
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: Color.white }}
            heading='NOTES'
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
                {this.state.markers.map((marker) => (
                  <TouchableOpacity>
                    <View style={{ flexDirection: 'column', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, borderBottomColor: '#C9C9C9' }}>
                      <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                          <Text>
                            <Text style={{ fontWeight: 'bold' }}>{marker.user_note} </Text>
                            {marker.note}
                          </Text>
                        </View>
                      </View>
                      <View style={{ width: '100%', flex: 1 }}>
                        <Text numberOfLines={1} style={{ paddingTop: 2, color: '#ccc' }}>
                          {marker.date}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </List>
            </ScrollView>
            <View
              style={{
                flex: 0.25,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                shadowColor: '#000',
                paddingBottom: 10,
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
              }}
            >
              <TouchableOpacity onPress={this.open_note} style={{ flex: 1 }}>
                <Text
                  style={{
                    width: '90%',
                    color: 'black',
                    backgroundColor: '#f0f0f0',
                    padding: 10,
                    marginHorizontal: 15,
                    marginVertical: 15,
                    marginBottom: 8,
                    fontSize: 16,
                    borderColor: '#D4D4D4',
                  }}
                >
                  Enter New Note
                </Text>
              </TouchableOpacity>
            </View>
          </Tab>
        </Tabs>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
  viewContainer: { flex: 1, width, backgroundColor: '#FFF' },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  dropdownsRow: { flexDirection: 'row', width: '100%', paddingHorizontal: '5%' },

  dropdown1BtnStyle: {
    flex: 1,
    height: 30,
    width: '100%',
    backgroundColor: '#f0f0f0',
    fontSize: 9,
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 15 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  divider: { width: 12 },
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown2DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown2RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: { color: '#444', textAlign: 'left' },
});
