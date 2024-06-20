import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import container from "../../Styles/Container/style";
import CodeInput from "react-native-confirmation-code-input";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../Component/Button/index";
export default class index extends Component {
  _onFulfill() {
    console.log("OK Pressed");
  }
  render() {
    return (
      <View style={[container.container]}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: height / 3.5,
              backgroundColor: Color.black
            }}
          >
            <ImageBackground
              source={require("../../Image/city-building.png")}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 40,
                  marginBottom: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  <Icon
                    name="ios-arrow-back"
                    size={30}
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
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "uber-b",
                    color: Color.white,
                    marginVertical: 10
                  }}
                >
                  Mobile Verification
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "uber-l",
                    color: Color.whiteSmoke,
                    marginVertical: 10
                  }}
                >
                  Enter your OTP code
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              //flex: 1,
              //justifyContent: "flex-end",
              //alignItems: "center",
              //marginVertical: 50
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginVertical: 50,
                justifyContent: "center",
               //  flex: 0.5
              }}
            >
              <CodeInput
                ref="codeInputRef1"
                className={"border-b"}
                keyboardType="number-pad"
                space={20}
                size={50}
                cellBorderWidth={5}
                codeLength={4}
                codeInputStyle={{
                  fontFamily: "uber-b",
                  fontSize: 28
                }}
                inputPosition="left"
                activeColor="black"
                inactiveColor="#A0A0A0"
                onFulfill={() => this._onFulfill()}
              />
            </View>
            <View style={{marginHorizontal:38,marginVertical:75}}>
              <Button
                onPress={() => this.props.navigation.navigate("Home")}
                Text="Verify"
                viewStyle={{ backgroundColor: Color.black,}}
              />
              </View>
          </View>
        </View>
      </View>
    );
  }
}
