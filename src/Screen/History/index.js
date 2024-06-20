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
import IconText from "../../Component/IconText/index";
import HistoryList from "../../Component/HistoryList/indx";
import style from "./style";
export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={[container.container]}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View style={{ width: width, height: height / 2.7 }}>
            <ImageBackground
              source={require("../../Image/halfbg.png")}
              style={{ flex: 1 }}
            >
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
                        //marginTop:40
                      },
                      this.props.iconStyle
                    ]}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <View style={{ flex: 0.5, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 28,
                        fontFamily: "uber-b",
                        color: Color.white,
                        marginVertical: 10
                      }}
                    >
                      History
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      justifyContent: "center"
                    }}
                  >
                    <ImageBackground
                      source={require("../../Image/Transpernt.png")}
                      style={{
                        borderRadius: 80
                        //  borderColor: Color.steel,
                        //  borderWidth: 2
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 0.8 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "uber",
                              color: Color.whiteSmoke,
                              marginHorizontal: 10,
                              marginVertical: 5,
                              alignSelf: "flex-start"
                            }}
                          >
                            Jan 9,2019
                          </Text>
                        </View>
                        <View style={{ flex: 0.1, justifyContent: "center" }}>
                          <TouchableOpacity>
                            <Icon
                              name="ios-arrow-down"
                              size={25}
                              style={[
                                {
                                  color: Color.whiteSmoke,
                                  alignSelf: "center"
                                  //marginTop:40
                                },
                                this.props.iconStyle
                              ]}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        {/* <ScrollView
          style={{ top: 0, bottom: 0, position: "absolute", flex: 1 }}
        > */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            marginTop: width / 2.3,
            marginBottom: 10,
            marginHorizontal: 10,
            backgroundColor: "Transparent",
            flex: 1
            //  justifyContent: "center"
            // borderRadius: 10,
            // borderColor: Color.steel,
            // borderWidth: 2
          }}
        >
          <ScrollView
            style={{ height: height,}}
            showsVerticalScrollIndicator={false}
          >
            <View style={style.historyListView}>
              <HistoryList
                source={require("../../Image/destination-icon.png")}
                pickupAddress="Prahalad nagar. S.G.Highway"
                destinationAddress="1003, Abhishree Adroit, India"
                price="75.00"
                status="Confirm"
                statusText={{ color: Color.purple, fontFamily: "uber-b" }}
              />
            </View>
            <View style={style.historyListView}>
              <HistoryList
                source={require("../../Image/destination-icon.png")}
                pickupAddress="Prahalad nagar. S.G.Highway"
                destinationAddress="1003, Abhishree Adroit, India"
                price="75.00"
                status="Completed"
                statusText={{ color: Color.green, fontFamily: "uber-b" }}
              />
            </View>
            <View style={style.historyListView}>
              <HistoryList
                source={require("../../Image/destination-icon.png")}
                pickupAddress="Prahalad nagar. S.G.Highway"
                destinationAddress="1003, Abhishree Adroit, India"
                price="75.00"
                status="Cancelled"
                onPress={() => this.props.navigation.navigate("Home")}
                statusText={{ color: Color.steel, fontFamily: "uber-b" }}
              />
            </View>
            <View style={style.historyListView}>
              <HistoryList
                source={require("../../Image/destination-icon.png")}
                pickupAddress="Prahalad nagar. S.G.Highway"
                destinationAddress="1003, Abhishree Adroit, India"
                price="75.00"
                status="Cancelled"
                statusText={{ color: Color.steel, fontFamily: "uber-b" }}
              />
            </View>
            <View style={style.historyListView}>
              <HistoryList
                source={require("../../Image/destination-icon.png")}
                pickupAddress="Prahalad nagar. S.G.Highway"
                destinationAddress="1003, Abhishree Adroit, India"
                price="75.00"
                status="Cancelled"
                statusText={{ color: Color.steel, fontFamily: "uber-b" }}
              />
            </View>
            <View style={style.historyListView}>
              <HistoryList
                source={require("../../Image/destination-icon.png")}
                pickupAddress="Prahalad nagar. S.G.Highway"
                destinationAddress="1003, Abhishree Adroit, India"
                price="75.00"
                status="Cancelled"
                statusText={{ color: Color.steel, fontFamily: "uber-b" }}
              />
            </View>
            <View style={[style.historyListView,{marginBottom:15}]}>
              <HistoryList
                source={require("../../Image/destination-icon.png")}
                pickupAddress="Prahalad nagar. S.G.Highway"
                destinationAddress="1003, Abhishree Adroit, India"
                price="75.00"
                status="Cancelled"
                statusText={{ color: Color.steel, fontFamily: "uber-b" }}
              />
            </View>
          </ScrollView>
          {/* </View> */}
        </View>
      </View>
    );
  }
}
