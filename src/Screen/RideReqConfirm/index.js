import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import { View, StatusBar, Image, Text, TouchableOpacity } from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import Button from "../../Component/Button/index";
import Modal from "react-native-modal";
export default class index extends Component {
  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });
  _toggleModal2 = () =>
    this.props.navigation.navigate("Home", this._toggleModal);
  render() {
    return (
      // Main View
      <View style={container.container}>
        <StatusBar barStyle="dark-content" />
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 23.032068,
            longitude: 72.525192,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <Back onPress={() => this.props.navigation.navigate("BookingReq")} />
        {/* sub view */}
        <View style={styles.container}>
          <View style={styles.subContainerView}>
            <View style={{ margin: 15 }}>
              {/* first row */}
              <View style={{ flexDirection: "row" }}>
                {/* profile pic */}
                <View style={{ flex: 0.2, alignItems: "center" }}>
                  <View style={styles.imageProfileView}>
                    <Image
                      source={require("../../Image/Pic.png")}
                      style={styles.imageProfile}
                    />
                  </View>
                </View>
                {/* profile name */}
                <View style={styles.textProfileView}>
                  <Text style={styles.textProfile}>Sam Lincan</Text>
                  <View style={{ flexDirection: "row", marginLeft: 10,flex:1}}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("Rating")}
                    >
                      {/* <View style={{backgroundColor:'red' }}> */}
                        <Image
                          source={require("../../Image/star.png")}
                          style={[styles.imageProfile,{height:16,width:16}]}
                        />
                      {/* </View> */}
                    </TouchableOpacity>
                    <Text style={[styles.titleText, { marginHorizontal: 5,fontSize:14 }]}>
                      4.2
                    </Text>
                  </View>
                </View>
                {/* msg,call */}
                <View style={{ flex: 0.25, marginVertical: 10 }}>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      flexDirection: "row",
                      marginHorizontal: 2
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 20 }}
                      onPress={() => this.props.navigation.navigate("Chat")}
                    >
                      <View
                        style={{
                          height: 18,
                          width: 18,
                          justifyContent: "center"
                        }}
                      >
                        <Image
                          source={require("../../Image/msg.png")}
                          style={styles.imageProfile}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          justifyContent: "center"
                        }}
                      >
                        <Image
                          source={require("../../Image/phone.png")}
                          style={styles.imageProfile}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* 2nd row */}
              <View style={{ flexDirection: "row", marginVertical: 20 }}>
                <View
                  style={[
                    styles.imageProfileView,
                    { height: 30, width: 30, borderRadius: 15 }
                  ]}
                >
                  <Image
                    source={require("../../Image/Pic2.png")}
                    style={styles.imageProfile}
                  />
                </View>
                <View
                  style={[
                    styles.imageProfileView,
                    { height: 30, width: 30, borderRadius: 15 }
                  ]}
                >
                  <Image
                    source={require("../../Image/Pic3.png")}
                    style={styles.imageProfile}
                  />
                </View>
                <View
                  style={[
                    styles.imageProfileView,
                    { height: 30, width: 30, borderRadius: 15 }
                  ]}
                >
                  <Image
                    source={require("../../Image/Pic4.png")}
                    style={styles.imageProfile}
                  />
                </View>
                <View style={{ justifyContent: "center", marginHorizontal: 3 }}>
                  <Text style={styles.textProfile}>03</Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.textProfile}>Recommended</Text>
                </View>
              </View>
              {/* 3rd row */}
              <View style={styles.view}>
                <View style={styles.optionView}>
                  <Image
                    source={require("../../Image/sedan-car-model.png")}
                    style={styles.image}
                  />
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>DISTANCE</Text>
                  <Text style={styles.text}>0.5 km</Text>
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>TIME</Text>
                  <Text style={styles.text}>2 Min</Text>
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>PRICE</Text>
                  <Text style={styles.text}>$ 10.00</Text>
                </View>
              </View>
            </View>
            <Button
              Text="Confirm"
              onPress={this._toggleModal}
              textStyle={{ fontFamily: "uber", fontSize: 16 }}
              viewStyle={{ marginBottom: 20 }}
            />
            {/* Alert Dialog */}
            <Modal isVisible={this.state.isModalVisible}>
              <View
                style={[
                  styles.subContainerView,
                  { alignSelf: "center", shadowOpacity: 0 }
                ]}
              >
                <Image
                  source={require("../../Image/checked.png")}
                  style={[
                    styles.image,
                    { width: 90, height: 90, borderRadius: 0, marginTop: 30 }
                  ]}
                />
                <Text
                  style={[
                    styles.textProfile,
                    {
                      alignSelf: "center",
                      fontFamily: "uber",
                      fontSize: 16,
                      margin: 10
                    }
                  ]}
                >
                  Booking Successful
                </Text>
                <View style={{ marginVertical: 20 }}>
                  <Text
                    style={[
                      styles.titleText,
                      { marginHorizontal: 2, fontSize: 14 }
                    ]}
                  >
                    Your booking has been confirmed.
                  </Text>
                  <Text
                    style={[
                      styles.titleText,
                      { marginHorizontal: 2, fontSize: 14 }
                    ]}
                  >
                    Driver will pickup you in 2 minutes.
                  </Text>
                </View>
                <View
                  style={{
                    borderTopWidth: 0.3,
                    flexDirection: "row",
                    borderTopColor: Color.steel,
                    marginTop: 20
                  }}
                >
                  <View
                    style={{
                      flex: 0.5,
                      borderRightWidth: 0.3,
                      borderRightColor: Color.steel
                    }}
                  >
                    <TouchableOpacity
                      onPress={this._toggleModal}
                      style={{ margin: 10 }}
                    >
                      <Text style={[styles.titleText, { margin: 20 }]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this._toggleModal(), this._toggleModal2();
                      }}
                      style={{ margin: 10 }}
                    >
                      <Text
                        style={[
                          styles.titleText,
                          { color: Color.black, margin: 20 }
                        ]}
                      >
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}
