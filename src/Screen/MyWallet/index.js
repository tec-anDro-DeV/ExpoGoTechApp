import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity, Image,StatusBar } from "react-native";
import Color from "../../Config/Color";
import style from "./style";
import container from "../../Styles/Container/style";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2Text from "../../Component/Icon2Text/index";
import List from "../../Component/Text2Icon/index";
import TextIcon from '../../Component/TextIcon/index';
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export default class index extends Component {
  render() {
    return (
      <View style={{flex:1,backgroundColor:Color.whiteSmoke}}>
       <StatusBar
            barStyle="light-content"
          />
        <View style={{ backgroundColor: Color.black, height: height / 2.5 }}>
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 45,
              marginBottom: 40
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
                  },
                  this.props.iconStyle
                ]}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ flex: 0.65, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "uber-b",
                    color: Color.white
                  }}
                >
                  My Wallet
                </Text>
              </View>
              <View
                style={{
                  flex: 0.35,
                  justifyContent: "center",
                  borderRadius: 30,
                  borderColor: Color.coal,
                  alignSelf: "flex-end",
                  backgroundColor: Color.coal
                }}
              >
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <View
                    style={{
                      justifyContent: "center",
                      flex: 0.4,
                      alignItems: "center"
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={require("../../Image/dollar.png")}
                        style={{ height: 22, width: 22 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ justifyContent: "center", flex: 0.6 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.white,
                        fontFamily: "uber-b"
                      }}
                    >
                      2500
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop:height/5.3,}}>
          <List Title="Payment Methods" mainView={{marginVertical:10}} viewText={{flex:0.6}} onPress={()=>this.props.navigation.navigate("Payment")}/>
          <List Title="Coupon" Text="3"/>
          <List Title="Integral Mall" Text="4500"/>
        </View>
        <View style={style.cardView}>
          <Icon2Text
            source={require("../../Image/cashDollor.png")}
            Title="Cash"
            Address="Default Payment Method"
            mainView={{ margin: 15 }}
            titleText={{ color: Color.black, fontSize: 16 }}
            addressText={{ color: Color.gray }}
            imageStyle={{ height: 55, width: 55 }}
            imageView={{ flex: 0.3 }}
          />

          <View style={{ flexDirection: "row", margin: 20 }}>
            <View style={{ flex: 0.7 }}>
              <Text
                style={{ color: Color.steel, fontSize: 12, fontFamily: "uber" }}
              >
                BALANCE
              </Text>
              <Text
                style={{
                  color: Color.pink,
                  fontSize: 24,
                  fontFamily: "uber-b"
                }}
              >
                $ 2500
              </Text>
            </View>
            <View style={{ flex: 0.3 }}>
              <Text
                style={{ color: Color.steel, fontSize: 12, fontFamily: "uber" }}
              >
                EXPIRES
              </Text>
              <Text
                style={{
                  color: Color.black,
                  fontSize: 20,
                  fontFamily: "uber-b"
                }}
              >
                09/21
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
