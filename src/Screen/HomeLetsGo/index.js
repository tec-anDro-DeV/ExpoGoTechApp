import React, { Component } from "react";
import MapView from 'react-native-maps';
let width = Dimensions.get("window").width;
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import container from "../../Styles/Container/style";
import style from "./style";
import Button from "../../Component/Button/index";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "1003, Abhishree Adroit, India" };
  }
  render() {
    return (
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
        <View
          style={[
            style.container,
            {
              ...Platform.select({
                ios: {
                  zIndex: 9
                }
              })
            }
          ]}
        >
          <View style={{ margin: 15, flexDirection: "row" }}>
            <View style={style.imageView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("HomeUp")}
              >
                <Image
                  source={require("../../Image/back.png")}
                  style={style.image}
                />
              </TouchableOpacity>
            </View>
            <View style={[this.props.viewText, { flex: 1 }]}>
              <TextInput
                style={{ height: 30 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />
            </View>
            <View style={style.imageView2}>
              <TouchableOpacity>
                <Image
                  source={require("../../Image/cancel-icon.png")}
                  style={style.image2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={style.subContainerView}>
          <Button
            onPress={() => this.props.navigation.navigate("BookingReq")}
            Text="Let's Go"
            viewStyle={{ margin: 0, borderRadius: 0, width: width }}
          />
        </View>
      </View>
    );
  }
}
