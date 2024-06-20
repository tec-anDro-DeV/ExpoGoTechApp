import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar
} from "react-native";
import styles from "./style";
import Texts from "../../Component/Text/index";
import Color from "../../Config/Color";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import * as firebase from 'firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default class index extends Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '', 
    };
  }

  componentDidMount() {

    this._getdata();
  }

  _getdata = async () => {
    console.log("enter get data");
    const user = await AsyncStorage.getItem('userName');
    this.setState({ username : user });
  }

  logout(){
    this._logout();
    
  }

  _logout = async () => {
    const user_id = await AsyncStorage.getItem('user_id');
    firebase.database().ref('tech_connected/'+user_id).set({  connected: "false", user_id: user_id });
    try {
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("userName");
        await AsyncStorage.removeItem("user_id");
        await AsyncStorage.removeItem("orders_local_3");
    }
    catch(exception) {

    }
    this.props.navigation.navigate("Auth")
  }


  

  ratingCompleted(rating) {
    console.log(rating);
  }
  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        {/* <StatusBar barStyle="light-content" /> */}
        <ScrollView>
          <View style={{ flex: 1 }}>
            {/* <ImageBackground
              source={require("../../Image/D_Rectangle.png")}
              style={{ height: height / 3.7 }}
            > */}
            <View
              style={{
                backgroundColor: "#727cf5",
                // borderBottomLeftRadius: 50,
                // borderBottomRightRadius: 100
              }}
            >
              <View
                style={[
                  {
                    //justifyContent:"center",
                    alignSelf: "center",
                    flex: 1,
                    // marginRight:30,
                    marginTop: 20,
                    marginBottom:20
                  }
                ]}
              >
                
                <View style={{ alignSelf: "center" }}>
                  <Text
                    style={[
                      {
                        color: "#fff",
                        fontSize: 18,
                        textAlign: "center",
                        fontFamily: "uber",
                      }
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
                backgroundColor: "#fff"
              }}
            >
              
              
              <TouchableOpacity
                onPress={() => this.logout() }
              >
                <View style={styles.rowView}>
                  <View style={styles.imageView}>
                    <Image
                      source={require("../../Image/logout.png")}
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.textView}>
                    <Texts Text="Logout" extraTextStyle={styles.TitleText} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.07, width: "100%", textAlign: 'center',justifyContent: 'center',alignItems: 'center', flexDirection: "row", marginTop: height-200, }}>
              
              <Text style={{ textAlign: 'center' }} >
                V 1.19
              </Text>
          </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
