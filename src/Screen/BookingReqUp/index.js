import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import RideType from "../../Component/RideType/index";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
            Source:require("../../Image/sedan-car-model.png"),
            RideType:"Premimum Sedan",
            Price:"$50.00",
            Distance:"Nearby you",
            Time:"15 min",
        },
        {
            Source:require("../../Image/luxury.png"),
            RideType:"Luxury",
            Price:"$90.00",
            Distance:"0.5 km",
            Time:"10 min",
        },
        {
            Source:require("../../Image/super_uxury.png"),
            RideType:"Super Luxury",
            Price:"$95.00",
            Distance:"0.8",
            Time:"12 min",
        },
        {
            Source:require("../../Image/bike.png"),
            RideType:"Bike",
            Price:"$40.00",
            Distance:"1.0 km",
            Time:"11 min",
        },
        {
            Source:require("../../Image/just_go.png"),
            RideType:"Just Go",
            Price:"$45.00",
            Distance:"2.3 km",
            Time:"20 min",
        },
      ]
    };
  }
  _keyExtractor = (item, index) => item.RideType;
  _renderItem = ({ item }) => (
   
      <RideType
        onPress={()=>this.props.navigation.navigate("BookingReq")}
        Source={item.Source}
        RideType={item.RideType}
        Price={item.Price}
        Distance={item.Distance}
        Time={item.Time}
      />
   
  );
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
              <TouchableOpacity>
                <Image
                  source={require("../../Image/up.png")}
                  style={styles.image}
                />
              </TouchableOpacity>

            <FlatList
              data={this.state.data}
              horizontal={false}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
