import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import { View, StatusBar, Image, Text, TouchableOpacity } from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import Button from "../../Component/Button/index";
import RideType from "../../Component/RideType/index";
export default class index extends Component {
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
        <Back onPress={() => this.props.navigation.navigate("HomeLetsGo")} />
        {/* sub view */}
        <View style={styles.container}>
          <View style={styles.subContainerView}>
            <View style={{ margin: 15 }}>
              <RideType
                onPress={() => this.props.navigation.navigate("BookingReqUp")}
                Source={require("../../Image/sedan-car-model.png")}
                RideType="Premimum Sedan"
                Price="$50.00"
                Distance="Nearby you"
                priceText={{ color: Color.pink }}
                Time="15 min"
              />
              <View style={styles.view}>
                <View style={styles.optionView}>
                  <TouchableOpacity>
                    <Image
                      source={require("../../Image/payment.png")}
                      style={styles.image}
                    />
                    <Text style={styles.text}>Payment</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.optionView}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Promocode")}
                  >
                    <Image
                      source={require("../../Image/promoCode.png")}
                      style={styles.image}
                    />
                    <Text style={styles.text}>Promocode</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.optionView}>
                  <TouchableOpacity
                   onPress={() => this.props.navigation.navigate("RideReqCancel")}
                  >
                    <Image
                      source={require("../../Image/cancel.png")}
                      style={styles.image}
                    />
                    <Text style={styles.text}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Button
              Text="Booking Request"
              onPress={() => this.props.navigation.navigate("RideReqConfirm")}
            />
          </View>
        </View>
      </View>
    );
  }
}
