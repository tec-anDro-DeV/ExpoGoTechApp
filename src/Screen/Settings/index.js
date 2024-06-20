import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import container from "../../Styles/Container/style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import style from "./style";
import TextIcon from "../../Component/TextIcon";
import Button from "../../Component/Button/index";
export default class index extends Component {
  render() {
    return (
      <View style={[container.container]}>
      <StatusBar
            barStyle="light-content"
          />
        <View style={{ width: width,backgroundColor:'#000'}}>
            <View
              style={{
                marginHorizontal: 15,
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon
                  name="ios-arrow-back"
                  size={25}
                  style={[
                    {
                      alignSelf: "flex-start",
                      color: "#fff"
                      //marginTop:40
                    },
                    this.props.iconStyle
                  ]}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row",}}>
                <View style={{ flex: 0.75, justifyContent: "center" }}>
                  <Text
                    style={{
                      fontSize: 26,
                      fontFamily: "uber-b",
                      color: Color.white,
                      marginTop:10,
                      marginBottom:25
                    }}
                  >
                   Settings
                  </Text>
                </View>
                {/* <View style={[style.imageProfileView, { flex: 0.25 }]}>
                  <Image
                    source={require("../../Image/Pic.png")}
                    style={style.imageProfile}
                  />
                </View> */}
              </View>
            </View>
        </View>
        <View />

        <KeyboardAvoidingView
          style={style.keyboardAvoidContainer}
          behavior="padding"
        >
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                // paddingVertical:20,
                backgroundColor: Color.white,
                borderBottomColor: Color.steel,
                borderBottomWidth: 0.3,
                borderTopColor: Color.steel,
                borderTopWidth: 0.3,
                marginVertical: 10
              }}
            >
              <View
                style={[
                  style.imageProfileView,
                  { flex: 0.25, marginHorizontal: 10 }
                ]}
              >
                <Image
                  source={require("../../Image/Pic.png")}
                  style={style.imageProfile}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 0.75,
                  marginHorizontal: 5
                }}
              >
                <View style={{ justifyContent: "center", flex: 0.9 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "uber-b",
                      color: Color.black
                    }}
                  >
                    Larry johanson
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "uber-r",
                      color: Color.steel
                    }}
                  >
                    Gold Member
                  </Text>
                </View>
                <View style={{ flex: 0.1, justifyContent: "center" }}>
                  <TouchableOpacity>
                    <Icon
                      name="ios-arrow-forward"
                      size={25}
                      style={[
                        {
                          alignSelf: "flex-start",
                          color: Color.steel
                        },
                        this.props.iconStyle
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TextIcon Title="Notification" />
            <TextIcon Title="Security" />
            <TextIcon Title="Language" />
            <TextIcon Title="Clear cache" mainView={{ marginTop: 15 }} />
            <TextIcon Title="Terms & Privacy Policy" />
            <TextIcon Title="Contact us" />
          </ScrollView>
          <Button
            Text="Log out"
            viewStyle={{
              backgroundColor: Color.white,
              borderRadius: 0,
              borderColor: Color.white,
              marginTop:10,
              marginBottom:0,
              marginHorizontal:0
            }}
            textStyle={{color:Color.steel}}
            onPress={() => this.props.navigation.navigate("SignUp")}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}
