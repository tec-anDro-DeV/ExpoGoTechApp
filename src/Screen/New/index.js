import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StyleSheet,
} from "react-native";
import container from "../../Styles/Container/style";
import { List } from "native-base";
import Color from "../../Config/Color";
import style from './style';
import API from '../../utils/api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Header from "../../Component/Header/index";
import Button from "../../Component/Button/index";
import * as firebase from 'firebase';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageZoom from 'react-native-image-pan-zoom';
import NetInfo from "@react-native-community/netinfo";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default class componentName extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      contracts: [],
      zones: [],
      latitude_new: "",
      longitude_new: "",
      new_zone: "",
      new_zone_name: "",
      new_contract: "0",
      new_contract_name: "",
      new_surface: "0",
      new_service: "0",
      new_square_footage: "",
      new_status: "open",
      showPlacesList: false,
      address_from: "",
      new_address: "",
      new_notes: "",
      new_priority: "",
      username: "",
      zones_ids: "",
      validate: "1",
      surfaces: [],
      services: [],
      b_image: [],
      b_show_image: false,
      b_show_images: false,
      b_currect_img: 0,
      b_add_btn: require("../../Image/camera2.png"),
      b_galery_btn: require("../../Image/galery.png"),
      a_image: [],
      a_show_image: false,
      a_show_images: false,
      a_currect_img: 0,
      a_add_btn: require("../../Image/camera2.png"),
      a_galery_btn: require("../../Image/galery.png"),
      text_btn: "Create Open Order",
      new_order_id: 0,
      modalVisible: false,
      modal_validate: false,
      modal_confirm_delete: false,
      modal_confirm_delete_a: false,
      images_to_upload: [],
      current_updating: 0,
      location: '',
      validate_address: "#ebebeb",
      validate_contract: "#ebebeb",
      validate_zone: "#ebebeb",
      validate_surface: "#ebebeb",
      validate_service: "#ebebeb",
      validate_square: "#ebebeb",
      show_address: false,
      activity_indicator: false,
      autocomplete_row: 0,
      is_conected: "false",
      modalImage: false,
      modalImage2: false,
      test: "",
      index_contract: 0,
      index_zone: 0,
      square_footage_r: 0,
      modal_square: false,
      square_footage_w: "",
      square_footage_h: "",
      new_params: [],
    };
  }

  scrollToTop = () => {
    this.scroller.scrollTo({ x: 0, y: 0, animated: true });
  };

  back = async () => {
    const page = await AsyncStorage.getItem('page');
    console.log("page :" + page);

    let new_params = {
    }
    await AsyncStorage.setItem('current_params', JSON.stringify (new_params) );

    if (page == 'map') {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('List');
    }
  }

  _getLocationAsync = async () => {

    this.load_local();

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      //console.log("here");
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const { status: status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status2 !== 'granted') {

    } else {
      console.log('persion');
    }

    const { status: status3 } = await Permissions.askAsync(Permissions.CAMERA);
    if (status3 !== 'granted') {

    } else {
      console.log('persion');
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    //console.log(location);

    this._getData();

  };

  async componentDidMount() {

    let new_params = await AsyncStorage.getItem('current_params');
    new_params = JSON.parse(new_params)
    this.setState({ new_params : new_params });

    let speed = 0;

    try {
      let downloadSizeInBits = 12000000;
      let startTime = (new Date()).getTime();
      await fetch('https://urbangraffitilogin.com/')
      let endTime = (new Date()).getTime();
      let duration = (endTime - startTime) / 1000;
      speed = (downloadSizeInBits / (1024 * 1024 * duration));
      this.setState({ test: speed });
    } catch (error) {
      speed = 0;
      this.setState({ test: 0 });
      console.error(error);
    }

    speed = parseFloat(speed);

    await NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if (state.type != "wifi") {
        if (speed > 2.5) {
          this.setState({ is_conected: state.isConnected.toString() });
        }
      } else {
        this.setState({ is_conected: state.isConnected.toString() });
      }

    });

    if (width < 350) {
      this.setState({
        font1: 12,
        font2: 10,
        h_autocomplete: 90
      });
    } else {
      this.setState({
        font1: 15,
        font2: 13,
        h_autocomplete: 60
      });
    }

    //console.log('hi1');
    this._getLocationAsync();


    const { navigation } = this.props;

    let autocomplete_row1 = 0;
    autocomplete_row1 = (height * 10) / 100;
    this.setState({ autocomplete_row: autocomplete_row1 });

    this.focusListener = navigation.addListener('focus', async () => {

      let new_params = await AsyncStorage.getItem('current_params');
      console.log("enter here")
      console.log(new_params);
      new_params = JSON.parse(new_params)
      this.setState({ new_params : new_params });

      //const { params } = this.props.navigation.state;
      if (this.state.new_params) {
        // console.log(params);
        this.setState({
          address_from: this.state.new_params.new_address,
          new_address: this.state.new_params.new_address,
          latitude_new: this.state.new_params.new_lat,
          longitude_new: this.state.new_params.new_log,
        });
        this._get_zone_2();
      }
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  get_zone(value) {
    this.setState({
      latitude_new: value.geometry.location.lat,
      longitude_new: value.geometry.location.lng,
      index_contract: -1,
      index_zone: -1
    });
    this._get_zone_2();
  }

  _get_zone_2 = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    //console.log("enter here 2");
    let data_response = await API.get_zone_new_order(user_id, token, this.state.latitude_new, this.state.longitude_new);
    console.log(data_response);

    let array = [{ "agency_id": "0", "contract_id": "0", "contract_name": "Select", }]
    let array2 = [{ "zone_id": "0", "zone_name": "Select", }]

    this.setState({
      new_zone: data_response.zone_id,
      new_contract: data_response.contract_id,
      zones: array2.concat(data_response.zones),
      contracts: array.concat(data_response.contracts),
    });

    let find_contract = 0;

    for (var i = 0; i < this.state.contracts.length; i++) {
      if (data_response.contract_id == this.state.contracts[i].contract_id) {
        this.setState({
          index_contract: i
        });
        find_contract = 1
      }
    }

    for (var i = 0; i < this.state.zones.length; i++) {
      if (data_response.zone_id == this.state.zones[i].zone_id) {
        this.setState({
          index_zone: i
        });
      }
    }

    if (find_contract == 0) {
      this.setState({
        index_contract: -1,
        index_zone: -1,
      });
    }

  }

  _get_zone_3 = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    //console.log("enter here 2");

    let data_response = await API.get_zone_new_order2(user_id, token, this.state.new_contract, this.state.zones_ids);
    //console.log(data_response);

    this.setState({
      zones: data_response.zones
    });
  }

  _get_zone_ofline = async () => {

    let local_orders_data = await AsyncStorage.getItem('new_order_data');
    data_response = JSON.parse(local_orders_data)
    let all_zones = data_response.zones;
    let new_zones = []
    console.log(all_zones);

    for (var i = 0; i < all_zones.length; i++) {

      if (all_zones[i].contract_id == this.state.new_contract) {
        new_zones.push(all_zones[i]);
      }
    }

    this.setState({
      zones: []
    });

    this.setState({
      zones: new_zones
    });
  }

  load_local = async () => {

    const local_orders_data = await AsyncStorage.getItem('new_order_data');
    data_response = JSON.parse(local_orders_data)

    this.setState({
      contracts: data_response.contracts,
      zones: data_response.zones,
      surfaces: data_response.surfaces,
      services: data_response.services,
    });

  }

  _getData = async () => {

    const user = await AsyncStorage.getItem('userName');
    this.setState({ username: user });

    const user_id = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('userToken');
    console.log("enter here");

    const local_orders_data = await AsyncStorage.getItem('new_order_data');
    data_response = JSON.parse(local_orders_data)

    this.setState({
      contracts: data_response.contracts,
      zones: data_response.zones,
      surfaces: data_response.surfaces,
      services: data_response.services,
    });

    /*
    let data_response =  await API.get_info_new_order(user_id,token);
    //console.log(data_response);
    if (data_response.message == "invalid_login") {

    }else{
      //console.log(data_response);  
      this.setState({        
        contracts: data_response.contracts,
        zones: data_response.zones,
        surfaces: data_response.surfaces,
        services: data_response.services,
      });      
      
    }
    */


    console.log("loc", this.state.location);

    try {
      let origin = this.state.location.coords.latitude + "," + this.state.location.coords.longitude;

      let resp = await fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBGkMG-nj0pgK1ruZRZUdLW-7SgSkmqQfQ&latlng=' + origin);
      let respJson = await resp.json();
      console.log(respJson);

      console.log(respJson.results[0].formatted_address);

      this.setState({
        address_from: respJson.results[0].formatted_address,
        new_address: respJson.results[0].formatted_address,
        latitude_new: this.state.location.coords.latitude,
        longitude_new: this.state.location.coords.longitude,
      });
      this._get_zone_2();


    } catch (error) {
      console.log(error)
      return error

    }

  }

  change_address_btn() {
    this.setState({
      show_address: true,
      new_address: "",
      address_from: "",
    });

  }

  open_map = async () => {

    let new_params = {
      order_id: 0,
      page: "new"
    }
    await AsyncStorage.setItem('current_params', JSON.stringify (new_params) );

    this.props.navigation.navigate('Map', {
      order_id: 0,
      page: "new"
    });
  }
  save_new = async () => {

    this.setState({ activity_indicator: true });

    console.log("enter new");
    console.log(this.state.new_zone);

    if (this.state.validate == "1") {

      console.log("enter new 2");

      console.log("s", this.state.new_surface);
      console.log("ser", this.state.new_service);
      console.log("sq", this.state.new_square_footage);
      if (this.state.new_address == "") {
        this.setState({ validate_address: "#FF0000" });
      } else {
        this.setState({ validate_address: "#ebebeb" });
      }

      if (this.state.new_contract == "0" || this.state.new_contract == "") {
        this.setState({ validate_contract: "#FF0000" });
      } else {
        this.setState({ validate_contract: "#ebebeb" });
      }

      if (this.state.new_zone == "0" || this.state.new_zone == "") {
        this.setState({ validate_zone: "#FF0000" });
      } else {
        this.setState({ validate_zone: "#ebebeb" });
      }

      if ((this.state.new_surface == "0" || this.state.new_surface == "") && this.state.new_status == 'completed') {
        this.setState({ validate_surface: "#FF0000" });
      } else {
        this.setState({ validate_surface: "#ebebeb" });
      }

      if ((this.state.new_service == "0" || this.state.new_service == "") && this.state.new_status == 'completed') {
        this.setState({ validate_service: "#FF0000" });
      } else {
        this.setState({ validate_service: "#ebebeb" });
      }

      if (this.state.new_square_footage == "" && this.state.new_status == 'completed') {
        this.setState({ validate_square: "#FF0000" });
      } else {
        this.setState({ validate_square: "#ebebeb" });
      }



      if (this.state.new_address != "" && this.state.new_zone != "" && this.state.new_contract != "" && this.state.new_status != "") {
        if (this.state.new_zone != "0" && this.state.new_contract != "0") {
          let valid = true;

          if ((this.state.new_surface == "0" || this.state.new_service == "0" || this.state.new_square_footage == "") && this.state.new_status == 'completed') {
            valid = false;
          }
          console.log("valid", valid);
          if (valid) {
            console.log("submit", "enter");

            console.log("enter new 4");
            this.setState({
              validate: "2"
            });

            let is_con = "";

            let speed = 0;

            try {
              let downloadSizeInBits = 12000000;
              let startTime = (new Date()).getTime();
              await fetch('https://urbangraffitilogin.com/')
              let endTime = (new Date()).getTime();
              let duration = (endTime - startTime) / 1000;
              speed = (downloadSizeInBits / (1024 * 1024 * duration));
              this.setState({ test: speed });
            } catch (error) {
              speed = 0;
              this.setState({ test: 0 });
              console.error(error);
            }

            speed = parseFloat(speed);

            await NetInfo.fetch().then(state => {
              console.log("Connection type", state.type);
              console.log("Is connected?", state.isConnected);
              if (state.type != "wifi") {
                if (speed > 2.5) {
                  this.setState({ is_conected: state.isConnected.toString() });
                  is_con = state.isConnected;
                } else {
                  this.setState({ is_conected: "false" });
                  is_con = false;
                }
              } else {
                this.setState({ is_conected: state.isConnected.toString() });
                is_con = state.isConnected;
              }

            });

            if (is_con) {

              const user_id = await AsyncStorage.getItem('user_id');
              const token = await AsyncStorage.getItem('userToken');
              let data_response = await API.new_order(user_id, token, this.state.new_address, this.state.latitude_new, this.state.longitude_new, this.state.new_contract, this.state.new_zone, this.state.new_status, this.state.new_notes, this.state.new_surface, this.state.new_service, this.state.new_square_footage, this.state.new_priority);
              console.log(data_response);
              if (data_response.message == "invalid_login") {

              } else {
                this.setState({
                  new_order_id: data_response.order_id
                });
                let correlative_n = 0;
                for (let before_image of this.state.b_image) {
                  if (before_image.type == 'new') {
                    let new_object = {
                      route: before_image.route,
                      correlative: correlative_n,
                      type: "before",
                    }
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
                      type: "after",
                    }
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

              const user_id = await AsyncStorage.getItem('user_id');
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

              let new_order = {}
              new_order.order_id = 0
              new_order.user_id = user_id
              new_order.address = this.state.new_address
              new_order.latitude_new = 0
              new_order.longitude_new = 0
              new_order.contract_id = this.state.new_contract
              new_order.contract_name = this.state.new_contract_name
              new_order.zone_id = this.state.new_zone
              new_order.zone_name = this.state.new_zone_name
              new_order.tech_status = this.state.new_status
              new_order.new_notes = this.state.new_notes
              new_order.surface_id = this.state.new_surface
              new_order.service_id = this.state.new_service
              new_order.square_footage = this.state.new_square_footage
              new_order.new_priority = this.state.new_priority
              new_order.before_images_local = this.state.b_image
              new_order.after_images_local = this.state.a_image
              new_order.before_images = false
              new_order.after_images = false
              new_order.notes_history = false
              new_order.code = "N/A"
              new_order.notes = this.state.new_notes
              new_order.notes_local = false
              new_order.order_type = "regular"
              new_order.sync_status = "new"
              new_order.new_source = "Tech App"

              if (this.state.new_status == 'open') {
                new_local_orders.orders.push(new_order);
              }
              if (this.state.new_status == 'survey') {
                new_local_orders.orders_survey.push(new_order);
              }
              if (this.state.new_status == 'completed') {
                new_local_orders.orders_completed.push(new_order);
              }

              let new_local_orders_save = JSON.stringify(new_local_orders);
              await AsyncStorage.setItem('orders_local_3', new_local_orders_save);


              this.back();



            }



          } else {
            this.setState({
              modal_validate: true
            });
            this.scrollToTop();
            this.setState({ activity_indicator: false });
          }

        } else {
          this.setState({
            modal_validate: true
          });
          this.scrollToTop();
          this.setState({ activity_indicator: false });
        }

      } else {
        this.setState({
          modal_validate: true
        });
        this.scrollToTop();
        this.setState({ activity_indicator: false });
      }
    } else {
      this.setState({
        modal_validate: true
      });
      this.scrollToTop();
      this.setState({ activity_indicator: false });
    }


  }

  upload_image = async () => {
    let count_images = this.state.images_to_upload.length;
    if (this.state.current_updating < count_images) {
      const user_id = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('userToken');
      //const { params } = this.props.navigation.state;
      console.log(this.state.images_to_upload[this.state.current_updating].route);
      try {
        let data_response = await API.upload_img(user_id, token, this.state.new_order_id, this.state.images_to_upload[this.state.current_updating].route, this.state.images_to_upload[this.state.current_updating].correlative, this.state.images_to_upload[this.state.current_updating].type);
        console.log(data_response);
        if (data_response.message == 'successfully') {
          let new_img = this.state.current_updating + 1;
          this.setState({
            current_updating: new_img,
          });
          if (this.state.modalVisible) {
            this.upload_image();
          }
        } else {
          console.log("error");
        }
      } catch (e) {
        this.setState({
          modalVisible: false,
          images_to_upload: [],
        });
        this.information_save();
        this.setState({ activity_indicator: false });
      }
    } else {
      this.setState({
        modalVisible: false,
        images_to_upload: [],
      });
      this.information_save();
      this.setState({ activity_indicator: false });
    }

  }
  cancel_upload = async () => {
    this.setState({
      modalVisible: false,
      images_to_upload: [],
    });
  }

  cancel_validate = async () => {
    this.setState({
      modal_validate: false
    });
  }
  information_save = async () => {
    this.firebase_func()
    if (this.state.new_status == 'open') {

      let new_params = {
        order_id: this.state.new_order_id,
      }
      await AsyncStorage.setItem('current_params', JSON.stringify (new_params) );
      
      this.props.navigation.navigate('Details', {
        order_id: this.state.new_order_id,
      });
    } else {
      this.back();
    }
  }

  firebase_func = async () => {

    const user_id = await AsyncStorage.getItem('user_id');

    var id = Math.floor(Math.random() * 100)

    firebase.database().ref('tech/' + user_id).set({ id: id });
  }

  onValueChange(value, index) {
    this.setState({
      new_contract: value,
    });

    for (var i = 0; i < this.state.contracts.length; i++) {

      if (this.state.contracts[i].contract_id == value) {
        this.setState({
          new_contract_name: this.state.contracts[i].contract_name,
        });

        console.log(this.state.contracts[i].contract_name);
      }
    }


    this._get_zone_ofline();



  }

  onValueChange_zone(value, index) {
    console.log(index);
    this.setState({
      new_zone: value,
    });


    for (var i = 0; i < this.state.zones.length; i++) {

      if (this.state.zones[i].zone_id == value) {
        this.setState({
          new_zone_name: this.state.zones[i].zone_name,
        });

        console.log(this.state.zones[i].zone_name);
      }
    }
    /*
    this.setState({
      new_zone_name: this.state.zones[index - 1].zone_name,
    });
    */

  }

  _pickImage = async () => {

    let count1 = this.state.b_image.length;
    if (count1 < 6) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.6
      });

      console.log(result);

      if (!result.canceled) {


        var wantedMaxSize = 1020;
        var rawheight = result.assets[0].height;
        var rawwidth = result.assets[0].width;

        var ratio = rawwidth / rawheight;
        // check vertical or horizont
        if (rawheight > rawwidth) {
          var wantedwidth = wantedMaxSize * ratio;
          var wantedheight = wantedMaxSize;
        }
        else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }


        if (Platform.OS == "android") {
          try {
            let asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
            let DCIM_id = asset.albumId;
            let album = await MediaLibrary.createAlbumAsync("UrbanGraffiti", asset);
            await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);
          } catch (error) {

          }
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

        var manipResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { height: 1024 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        }
        var joined = this.state.b_image.concat(new_object);
        this.setState({ b_image: joined });
        let count = this.state.b_image.length;
        if (count == 1) {
          this.setState({
            b_show_image: "show",
          });
        }
        if (count > 1) {
          this.setState({
            b_show_images: "show",
          });
        }
        let new_current = count - 1;
        this.setState({
          b_currect_img: new_current,
        });

        if (count == 6) {
          this.setState({
            b_add_btn: require("../../Image/camera2_gray.png"),
          });
          this.setState({
            b_galery_btn: require("../../Image/galery_gray.png"),
          });
        }
      }
    }

  };

  _pickImage_galery = async () => {

    let count1 = this.state.b_image.length;
    if (count1 < 6) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.6
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
        }
        else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }
        if (Platform.OS == "android") {
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

        var manipResult = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ resize: { height: 1024 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        }
        var joined = this.state.b_image.concat(new_object);
        this.setState({ b_image: joined });
        let count = this.state.b_image.length;
        if (count == 1) {
          this.setState({
            b_show_image: "show",
          });
        }
        if (count > 1) {
          this.setState({
            b_show_images: "show",
          });
        }
        let new_current = count - 1;
        this.setState({
          b_currect_img: new_current,
        });

        if (count == 6) {
          this.setState({
            b_add_btn: require("../../Image/camera2_gray.png"),
          });
          this.setState({
            b_galery_btn: require("../../Image/galery_gray.png"),
          });
        }
      }
    }


  };

  _pickImage_a = async () => {

    let count1 = this.state.a_image.length;
    if (count1 < 6) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.6
      });

      console.log(result);

      if (!result.canceled) {

        var wantedMaxSize = 1020;
        var rawheight = result.assets[0].height;
        var rawwidth = result.assets[0].width;

        var ratio = rawwidth / rawheight;
        // check vertical or horizont
        if (rawheight > rawwidth) {
          var wantedwidth = wantedMaxSize * ratio;
          var wantedheight = wantedMaxSize;
        }
        else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }
        if (Platform.OS == "android") {
          try {
            let asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
            let DCIM_id = asset.albumId;
            let album = await MediaLibrary.createAlbumAsync("UrbanGraffiti", asset);
            await MediaLibrary.removeAssetsFromAlbumAsync([asset], DCIM_id);
          } catch (error) {

          }
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

        var manipResult = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { height: 1024 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        }
        var joined = this.state.a_image.concat(new_object);
        this.setState({ a_image: joined });
        let count = this.state.a_image.length;
        if (count == 1) {
          this.setState({
            a_show_image: "show",
          });
        }
        if (count > 1) {
          this.setState({
            a_show_images: "show",
          });
        }
        let new_current = count - 1;
        this.setState({
          a_currect_img: new_current,
        });

        if (count == 6) {
          this.setState({
            a_add_btn: require("../../Image/camera2_gray.png"),
          });
          this.setState({
            a_galery_btn: require("../../Image/galery_gray.png"),
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
        quality: 0.6
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
        }
        else {
          var wantedwidth = wantedMaxSize;
          var wantedheight = wantedMaxSize / ratio;
        }
        if (Platform.OS == "android") {
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

        var manipResult = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ resize: { height: 1024 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        let new_object = {
          route: manipResult.uri,
          type: 'new',
        }
        var joined = this.state.a_image.concat(new_object);
        this.setState({ a_image: joined });
        let count = this.state.a_image.length;
        if (count == 1) {
          this.setState({
            a_show_image: "show",
          });
        }
        if (count > 1) {
          this.setState({
            a_show_images: "show",
          });
        }
        let new_current = count - 1;
        this.setState({
          a_currect_img: new_current,
        });

        if (count == 6) {
          this.setState({
            a_add_btn: require("../../Image/camera2_gray.png"),
          });
          this.setState({
            a_galery_btn: require("../../Image/galery_gray.png"),
          });
        }
      }
    }


  };

  prev_img = async () => {
    console.log("test");
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
    console.log("test");
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
    console.log("test");
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
    console.log("test");
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

  pre_remove_img_btn = async (key) => {
    this.setState({
      b_currect_img: key
    });
    this.setState({
      modal_confirm_delete: true
    });
  }

  pre_remove_img_btn_a = async (key) => {
    this.setState({
      a_currect_img: key
    });
    this.setState({
      modal_confirm_delete_a: true
    });
  }

  remove_img_btn = async () => {
    this.setState({
      modal_confirm_delete: true
    });
  }

  cancel_delete_img = async () => {
    this.setState({
      modal_confirm_delete: false
    });
  }

  remove_img_btn_a = async () => {
    this.setState({
      modal_confirm_delete_a: true
    });
  }

  cancel_delete_img_a = async () => {
    this.setState({
      modal_confirm_delete_a: false
    });
  }

  remove_img = async () => {

    this.setState({
      modal_confirm_delete: false
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
        b_show_image: "show",
        b_show_images: false,
      });
    }
    if (count > 1) {
      this.setState({
        b_show_images: "show",
      });
    }

    this.setState({
      b_add_btn: require("../../Image/camera2.png"),
    });
    this.setState({
      b_galery_btn: require("../../Image/galery.png"),
    });

  }

  remove_img_a = async () => {

    this.setState({
      modal_confirm_delete_a: false
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
        a_show_image: "show",
        a_show_images: false,
      });
    }
    if (count > 1) {
      this.setState({
        a_show_images: "show",
      });
    }

    this.setState({
      a_add_btn: require("../../Image/camera2.png"),
    });
    this.setState({
      a_galery_btn: require("../../Image/galery.png"),
    });

  }

  change_status(itemValue) {
    this.setState({ new_status: itemValue })
    if (itemValue == 'open') {
      this.setState({ text_btn: "Create Open Order" })
    }
    if (itemValue == 'survey') {
      this.setState({ text_btn: "Create Survey" })
    }
    if (itemValue == 'completed') {
      this.setState({ text_btn: "Complete Order" })
    }
  }

  onPress_back = () => {
    Keyboard.dismiss()
  };

  pre_open_image = (key) => {
    this.setState({
      b_currect_img: key
    });
    this.setState({
      modalImage: true,
    });
  }

  pre_open_image_a = (key) => {
    this.setState({
      a_currect_img: key
    });
    this.setState({
      modalImage2: true,
    });
  }


  open_image = () => {
    this.setState({
      modalImage: true,
    });
  }

  close_image = () => {
    this.setState({
      modalImage: false,
    });
  }

  open_image2 = () => {
    this.setState({
      modalImage2: true,
    });
  }

  close_image2 = () => {
    this.setState({
      modalImage2: false,
    });
  }

  close_qf = () => {

    this.setState({
      square_footage_r: 0,
      square_footage_w: "",
      square_footage_h: "",
      modal_square: false
    });
  }

  save_qf = () => {
    this.setState({
      new_square_footage: String(this.state.square_footage_r),
    });
    this.setState({
      square_footage_r: 0,
      square_footage_w: "",
      square_footage_h: "",
      modal_square: false
    });
  }



  render() {

    return (
      <SafeAreaView style={[container.container]}>
        <Header
          title="New Work Order"
          onPress={() => this.back()}
        />

        <Modal
          style={{ margin: 0 }}
          animationType="slide"
          transparent={true}
          visible={this.state.modal_square}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>

            <View

              style={{

                width: "80%",
                height: 300,
                marginBottom: Platform.OS === "ios" ? "50%" : "1%",
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,

              }}>

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Width (Ft)</Text>
              </View>
              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10
              }}>
                <View style={{
                  borderColor: "#ebebeb", borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8,
                }}>
                  <TextInput
                    style={{ width: "100%", height: 30, backgroundColor: "#f0f0f0", }}
                    paddingRight={12}
                    paddingLeft={12}
                    keyboardType="number-pad"
                    value={this.state.square_footage_w}
                    onChangeText={(itemValue, itemIndex) =>
                      this.setState({ square_footage_w: itemValue, square_footage_r: itemValue * this.state.square_footage_h })
                    }
                  >
                  </TextInput>
                </View>
              </View>


              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Height (Ft)</Text>
              </View>
              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10
              }}>
                <View style={{
                  borderColor: "#ebebeb", borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8,
                }}>
                  <TextInput
                    style={{ width: "100%", height: 30, backgroundColor: "#f0f0f0", }}
                    paddingRight={12}
                    paddingLeft={12}
                    keyboardType="number-pad"
                    value={this.state.square_footage_h}
                    onChangeText={(itemValue, itemIndex) =>
                      this.setState({ square_footage_h: itemValue, square_footage_r: itemValue * this.state.square_footage_w })
                    }
                  >
                  </TextInput>
                </View>
              </View>

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Square Footage (auto) </Text>
              </View>
              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10
              }}>
                <View style={{
                  borderColor: "#ebebeb", borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8,
                }}>
                  <Text numberOfLines={2} style={{ paddingHorizontal: 8, paddingVertical: 6 }} >{this.state.square_footage_r}</Text>
                </View>
              </View>





              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={this.close_qf} style={{ textAlign: 'right' }} >
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "red", marginRight: 16, marginTop: 6, marginVertical: 15, }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.save_qf} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "green", marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }} >Save</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: 300,
              height: 150,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>Uploading Images</Text>
              <Text style={{ textAlign: "center" }} >{this.state.current_updating} of {this.state.images_to_upload.length} </Text>
              <Button
                Text="Cancel"
                onPress={this.cancel_upload}
                textStyle={{ fontFamily: "uber", fontSize: 16 }}
                viewStyle={{ marginBottom: 20 }}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_validate}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>

            <View style={{
              width: 300,
              height: 150,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              textAlign: "center",
              justifyContent: 'center',
              alignItems: 'center',
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}>
              <Image
                source={require("../../Image/priority1.png")}
                style={{
                  width: 20,
                  height: 20,
                  marginTop: 8,
                }}
              />
              <Text style={{ textAlign: "center", marginTop: 10 }}>You must enter all required fields in order to continue.</Text>
              <Button
                Text="Close"
                onPress={this.cancel_validate}
                textStyle={{ fontFamily: "uber", fontSize: 16 }}
                viewStyle={{ marginBottom: 20 }}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_confirm_delete}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: 300,
              height: 150,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}>
              <Text style={{ textAlign: "center", marginTop: 20 }}>Are you sure you want to delete picture ?</Text>
              <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 70 }}>
                <TouchableOpacity onPress={this.cancel_delete_img} style={{ textAlign: 'right' }} >
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "green", marginRight: 16, marginTop: 6, marginVertical: 15, }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.remove_img} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "red", marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }} >Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modal_confirm_delete_a}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: 300,
              height: 150,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
            }}>
              <Text style={{ textAlign: "center", marginTop: 20 }}>Are you sure you want to delete picture ?</Text>
              <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 70 }}>
                <TouchableOpacity onPress={this.cancel_delete_img_a} style={{ textAlign: 'right' }} >
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "green", marginRight: 16, marginTop: 6, marginVertical: 15, }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.remove_img_a} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold", color: "red", marginRight: 8, marginTop: 6, marginVertical: 15, paddingRight: 4 }} >Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          style={{ margin: 0 }}
          animationType="slide"
          transparent={true}
          visible={this.state.modalImage}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <View style={{
              width: "100%",
              height: "100%",
              backgroundColor: 'black',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}>

              {(this.state.b_show_image) && (
                <View style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: 'center',
                  alignItems: 'center'

                }}>
                  <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={width}
                    imageHeight={height - height / 2}
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: 'center',
                      alignItems: 'center'

                    }}
                  >

                    <Image source={{ uri: this.state.b_image[this.state.b_currect_img].route }} style={{ width: width, aspectRatio: 1, resizeMode: 'contain', }} />
                  </ImageZoom>
                </View>

              )}

              <TouchableOpacity
                style={{
                  position: "absolute",
                  alignSelf: 'flex-end',
                }}
                onPress={() => this.close_image()}
              >
                <Image
                  source={require("../../Image/menu_7.png")}
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

        <Modal
          style={{ margin: 0 }}
          animationType="slide"
          transparent={true}
          visible={this.state.modalImage2}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <View style={{
              width: "100%",
              height: "100%",
              backgroundColor: 'black',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,
              elevation: 6,
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}>

              {(this.state.a_show_image) && (
                <View style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: 'center',
                  alignItems: 'center'

                }}>
                  <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={width}
                    imageHeight={height - height / 2}
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: 'center',
                      alignItems: 'center'

                    }}
                  >

                    <Image source={{ uri: this.state.a_image[this.state.a_currect_img].route }} style={{ width: width, aspectRatio: 1, resizeMode: 'contain', }} />
                  </ImageZoom>
                </View>

              )}

              <TouchableOpacity
                style={{
                  position: "absolute",
                  alignSelf: 'flex-end',
                }}
                onPress={() => this.close_image2()}
              >
                <Image
                  source={require("../../Image/menu_7.png")}
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



        <ScrollView
          ref={(scroller) => { this.scroller = scroller }}
          keyboardShouldPersistTaps='handled'
          style={{ flex: 0.85 }}>
          <TouchableWithoutFeedback onPress={this.onPress_back}>
            <List style={{ marginVertical: 20, marginHorizontal: 15 }}>

              {(this.state.is_conected == 'true') && (
                <View>
                  {(this.state.show_address == true) && (
                    <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, }}>

                      <GooglePlacesAutocomplete
                        key={this.state.address_from}
                        enableHighAccuracyLocation={true}
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        //listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        value={this.state.address_from}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => {
                          // 'details' is provided when fetchDetails = true
                          this.setState({ new_address: data.description })
                          this.get_zone(details);
                        }}

                        listViewDisplayed={this.state.showPlacesList}
                        textInputProps={{
                          onFocus: () => this.setState({ showPlacesList: true }),
                          onBlur: () => this.setState({ showPlacesList: false }),
                          onChangeText: (text) => { this.setState({ new_address: text }) }
                        }}

                        getDefaultValue={() => this.state.address_from}

                        query={{
                          // available options: https://developers.google.com/places/web-service/autocomplete
                          key: 'AIzaSyBGkMG-nj0pgK1ruZRZUdLW-7SgSkmqQfQ',
                          language: 'en', // language of the results
                          components: 'country:us',
                        }}

                        renderRow={row => {
                          console.log(row);
                          return (
                            row.structured_formatting.main_text ?
                              <Text style={{ flexDirection: "row", height: 150 }}>
                                <Text style={{ fontSize: this.state.font1 }} >
                                  {row.structured_formatting.main_text}{"\n"}
                                </Text>
                                <Text style={{ color: "#808080", fontSize: this.state.font2 }} >
                                  {row.structured_formatting.secondary_text}
                                </Text>
                              </Text>
                              : row.vicinity
                          )
                        }}


                        styles={{
                          textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderTopWidth: 0,
                            borderBottomWidth: 0
                          },
                          textInput: {
                            backgroundColor: "#f0f0f0",
                            borderColor: this.state.validate_address,
                            borderWidth: 1,
                            borderRadius: 0,

                            height: 35
                          },
                          container: {
                            borderColor: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                          },
                          predefinedPlacesDescription: {
                            color: '#1faadb'
                          },
                          poweredContainer: {
                            height: 10,
                            color: '#5d5d5d',
                            fontSize: 16,
                          },
                          row: {
                            height: this.state.h_autocomplete,
                          },
                        }}


                        currentLocationLabel="Current location"
                        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                          rankby: 'distance',
                        }}
                        // filterReverseGeocodingByTypes={[
                        //   'locality',
                        // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        debounce={200}

                      />
                    </View>
                  )}
                  {(this.state.show_address == false) && (
                    <View style={{ flexDirection: "row", paddingTop: 16, paddingBottom: 10 }}>
                      <View style={{
                        borderColor: "#ebebeb", borderStartWidth: 1, backgroundColor: "#f0f0f0",
                        borderEndWidth: 1,
                        borderTopWidth: 1,
                        boderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1, flex: 1, marginHorizontal: 8,
                      }}>
                        <Text style={{ paddingHorizontal: 8, paddingVertical: 6, paddingRight: 30, }} >{this.state.address_from}</Text>
                        <TouchableOpacity onPress={() => { this.change_address_btn() }} style={{ position: "absolute", top: 5, right: 10 }}>
                          <Text style={{ fontSize: 17 }}>X</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, }}>

                    <TouchableOpacity onPress={() => { this.open_map() }}
                      style={{
                        flex: 1, flexDirection: "row", textAlign: "center", justifyContent: 'center', alignItems: 'center',
                        backgroundColor: "white", shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 5,
                        marginHorizontal: 8,
                        paddingVertical: 8,
                      }}  >
                      <Image style={style.icon_image}
                        source={require("../../Image/icon2.png")}
                      />
                      <Text style={{ paddingTop: 2 }}>Set Location On Map</Text>
                    </TouchableOpacity>


                  </View>

                </View>
              )}

              {(this.state.is_conected == 'false') && (
                <View>
                  <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                    <Text style={{ width: "100%" }} >Address</Text>
                  </View>
                  <View style={{
                    flexDirection: "row", paddingTop: 10, paddingBottom: 10
                  }}>
                    <View style={{
                      borderColor: this.state.validate_square, borderStartWidth: 1,
                      borderEndWidth: 1,
                      borderTopWidth: 1,
                      boderLeftWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1, flex: 1, marginHorizontal: 8,
                    }}>
                      <TextInput
                        style={{ width: "100%", height: 30, backgroundColor: "#f0f0f0", }}
                        paddingRight={12}
                        paddingLeft={12}
                        value={this.state.new_address}
                        onChangeText={(itemValue, itemIndex) =>
                          this.setState({ new_address: itemValue })
                        }
                      >
                      </TextInput>
                    </View>
                  </View>
                </View>
              )}

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Contract</Text>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10 }}>
                <View style={{
                  borderColor: this.state.validate_contract, borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8, backgroundColor: "#f0f0f0",
                }}>

                  <SelectDropdown
                    key={this.state.index_contract}
                    data={this.state.contracts}
                    defaultValueByIndex={this.state.index_contract}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                      //citiesDropdownRef.current.reset();
                      //setCities([]);
                      //setCities(selectedItem.cities);
                      this.onValueChange(selectedItem.contract_id, index)
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
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Zone</Text>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10 }}>
                <View style={{
                  borderColor: this.state.validate_zone, borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8, backgroundColor: "#f0f0f0",
                }}>

                  <SelectDropdown
                    key={this.state.index_zone}
                    data={this.state.zones}
                    defaultValueByIndex={this.state.index_zone}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                      //citiesDropdownRef.current.reset();
                      //setCities([]);
                      //setCities(selectedItem.cities);
                      this.onValueChange_zone(selectedItem.zone_id, index)
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
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />

                </View>
              </View>

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Request Comment</Text>
              </View>
              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10
              }}>
                <TextInput
                  style={{
                    flex: 1,
                    borderColor: Color.steel,
                    borderWidth: 0.5,
                    borderRadius: 5,
                    fontSize: 18,
                    marginVertical: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 7,

                    marginHorizontal: 8,
                    backgroundColor: "#f0f0f0",
                  }}
                  value={this.state.new_notes}
                  onChangeText={(itemValue, itemIndex) =>
                    this.setState({ new_notes: itemValue })
                  }
                  placeholderTextColor={Color.steel}
                  placeholder=""
                  underlineColorAndroid={"transparent"}
                  keyboardType="default"
                />
              </View>

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Surface</Text>
              </View>
              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10
              }}>
                <View style={{
                  borderColor: this.state.validate_surface, borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8, backgroundColor: "#f0f0f0",
                }}>


                  <SelectDropdown
                    data={this.state.surfaces}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                      //citiesDropdownRef.current.reset();
                      //setCities([]);
                      //setCities(selectedItem.cities);
                      this.setState({ new_surface: selectedItem.surface_id })
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
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />

                </View>
              </View>

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Service</Text>
              </View>
              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10
              }}>
                <View style={{
                  borderColor: this.state.validate_service, borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8, backgroundColor: "#f0f0f0",
                }}>

                  <SelectDropdown
                    data={this.state.services}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                      //citiesDropdownRef.current.reset();
                      //setCities([]);
                      //setCities(selectedItem.cities);
                      this.setState({ new_service: selectedItem.service_id })
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
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                </View>
              </View>

              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "50%" }} >Square Footage</Text>
                <View style={{ width: "50%", textAlign: "right" }} >
                  <TouchableOpacity onPress={() => { this.setState({ modal_square: true }) }}>
                    <Text style={{ textAlign: "right" }} >
                      Calculator
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10
              }}>
                <View style={{
                  borderColor: this.state.validate_square, borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8,
                }}>
                  <TextInput

                    style={{ width: "100%", height: 30, backgroundColor: "#f0f0f0", }}
                    paddingRight={12}
                    paddingLeft={12}
                    keyboardType="number-pad"
                    value={this.state.new_square_footage}
                    onChangeText={(itemValue, itemIndex) =>
                      this.setState({ new_square_footage: itemValue })
                    }
                  >
                  </TextInput>
                </View>
              </View>

              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10, marginHorizontal: 8
              }}>
                <View style={{ width: "100%" }} >
                  <View style={{ width: "100%", flexDirection: 'row' }}>
                    <Text style={{ width: "40%" }} >Before</Text>
                  </View>

                  <View style={{ flexDirection: "row", }} >
                    <View style={{ width: "50%" }}>
                      <Button
                        Text={"CAMERA"}
                        onPress={this._pickImage}
                        textStyle={{ fontSize: 14, color: "#000000", }}
                        viewStyle={{ color: "#000000", marginBottom: 20, backgroundColor: "#f0f0f0", height: 45 }}
                      />
                    </View>
                    <View style={{ width: "50%" }}>
                      <Button
                        Text={"GALLERY"}
                        onPress={this._pickImage_galery}
                        textStyle={{ fontSize: 14, color: "#000000", }}
                        viewStyle={{ color: "#000000", marginBottom: 20, backgroundColor: "#f0f0f0", height: 45 }}
                      />
                    </View>

                  </View>
                  {this.state.b_image.map((b_image_item, key) =>
                    <View style={{ flexDirection: "row", }} >
                      <View style={{ width: "40%", justifyContent: "center" }}>
                        <Button
                          Text={"DELETE"}
                          onPress={() => { this.pre_remove_img_btn(key) }}
                          textStyle={{ fontSize: 14, color: "#000000", }}
                          viewStyle={{ color: "#000000", marginBottom: 20, backgroundColor: "#f0f0f0", height: 45 }}
                        />
                      </View>
                      <View style={{ width: "60%" }}>
                        <TouchableOpacity onPress={() => { this.pre_open_image(key) }}>
                          <Image source={{ uri: b_image_item.route }} style={{ width: "100%", height: 100, marginTop: 10, resizeMode: "cover" }} />
                        </TouchableOpacity>
                      </View>
                    </View>

                  )}



                </View>
              </View>

              <View style={{
                flexDirection: "row", paddingTop: 10, paddingBottom: 10, marginHorizontal: 8
              }}>
                <View style={{ width: "100%" }} >
                  <View style={{ width: "100%", flexDirection: 'row' }}>
                    <Text style={{ width: "40%" }} >After</Text>
                  </View>


                  <View style={{ flexDirection: "row", }} >
                    <View style={{ width: "50%" }}>
                      <Button
                        Text={"CAMERA"}
                        onPress={this._pickImage_a}
                        textStyle={{ fontSize: 14, color: "#000000", }}
                        viewStyle={{ color: "#000000", marginBottom: 20, backgroundColor: "#f0f0f0", height: 45 }}
                      />
                    </View>
                    <View style={{ width: "50%" }}>
                      <Button
                        Text={"GALLERY"}
                        onPress={this._pickImage_galery_a}
                        textStyle={{ fontSize: 14, color: "#000000", }}
                        viewStyle={{ color: "#000000", marginBottom: 20, backgroundColor: "#f0f0f0", height: 45 }}
                      />
                    </View>

                  </View>
                  {this.state.a_image.map((a_image_item, key) =>
                    <View style={{ flexDirection: "row", }} >
                      <View style={{ width: "40%", justifyContent: "center" }}>
                        <Button
                          Text={"DELETE"}
                          onPress={() => { this.pre_remove_img_btn_a(key) }}
                          textStyle={{ fontSize: 14, color: "#000000", }}
                          viewStyle={{ color: "#000000", marginBottom: 20, backgroundColor: "#f0f0f0", height: 45 }}
                        />
                      </View>
                      <View style={{ width: "60%" }}>
                        <TouchableOpacity onPress={() => { this.pre_open_image_a(key) }}>
                          <Image source={{ uri: a_image_item.route }} style={{ width: "100%", height: 100, marginTop: 10, resizeMode: "cover" }} />
                        </TouchableOpacity>
                      </View>
                    </View>

                  )}

                </View>
              </View>



              <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 8, }}>
                <Text style={{ width: "100%" }} >Status</Text>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10 }}>
                <View style={{
                  borderColor: "#ebebeb", borderStartWidth: 1,
                  borderEndWidth: 1,
                  borderTopWidth: 1,
                  boderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1, flex: 1, marginHorizontal: 8, backgroundColor: "#f0f0f0",
                }}>

                  <SelectDropdown
                    data={[{ name: "Open", value: "open" }, { name: "Survey", value: "survey" }, { name: "Complete", value: "completed" }]}
                    defaultValueByIndex={0}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                      //citiesDropdownRef.current.reset();
                      //setCities([]);
                      //setCities(selectedItem.cities);
                      this.change_status(selectedItem.value)
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
                    renderDropdownIcon={isOpened => {
                      return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                  />
                </View>
              </View>


              {(this.state.activity_indicator == false) && (
                <Button
                  Text={this.state.text_btn}
                  textStyle={{ fontSize: 15 }}
                  viewStyle={{ marginBottom: 20, backgroundColor: "#727cf5", height: 50 }}
                  onPress={() => { this.save_new() }}
                />
              )}
              {(this.state.activity_indicator == true) && (
                <View

                  style={{
                    marginBottom: 20, backgroundColor: "#727cf5",
                    justifyContent: "center",
                    margin: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: 2,
                    height: 45
                  }}
                >
                  <ActivityIndicator size="small" color="#FFFFFF" />

                </View>
              )}



            </List>
          </TouchableWithoutFeedback>
        </ScrollView>
        <HideWithKeyboard style={{ flex: 0.07, width: "100%", textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: "row" }} >
          <View style={{ width: "10%", textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
          </View>
          <View style={{ width: "80%", textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <Image
              source={require("../../Image/person2.png")}
              style={{
                height: 19,
                width: 19,
                marginHorizontal: 7
              }}
            />
            <Text style={{ textAlign: 'center' }} >
              {this.state.username}
            </Text>
          </View>
          <View style={{ width: "10%", textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            {(this.state.is_conected == 'false') && (
              <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "red" }} >
              </View>
            )}
            {(this.state.is_conected == 'true') && (
              <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: "green" }} >
              </View>
            )}
          </View>
        </HideWithKeyboard>
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
  headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
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
    width: "100%",
    backgroundColor: '#f0f0f0',
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
