import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import container from "../../Styles/Container/style";
import Color from "../../Config/Color";
import Button from "../../Component/Button/index";
export default class signUP extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={container.container}  behavior='padding' enabled keyboardVerticalOffset={30}>
        <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
          <TextInput
            style={{
              borderColor: Color.steel,
              borderWidth: 0.5,
              borderRadius: 5,
              fontSize: 18,
              marginVertical: 10,
              paddingHorizontal: 15,
              paddingVertical: 7,
              fontFamily: "uber-r" 
            }}
            placeholderTextColor={Color.steel}
            placeholder="Email address"
            underlineColorAndroid={"transparent"}
            keyboardType="email-address"
          />
          <TextInput
            style={{
              borderColor: Color.steel,
              borderWidth: 0.5,
              borderRadius: 5,
              fontSize: 18,
              marginVertical: 10,
              paddingHorizontal: 15,
              paddingVertical: 7,
              fontFamily: "uber-r"
            }}
            keyboardType="phone-pad"
            placeholderTextColor={Color.steel}
            placeholder="Mobile number"
            underlineColorAndroid={"transparent"}
          />
        </View>
        <Button
          Text="Sign Up"
          textStyle={{ fontSize: 15, fontWeight: "100" }}
          onPress={this.props.onPress}
        />
        <Button
          Text="Connect with Facebook"
          textStyle={{ fontSize: 15, fontWeight: "100" }}
          viewStyle={{ backgroundColor: Color.facebook }}
          onPress={this.props.onPressFB}
        />
      </KeyboardAvoidingView>
    );
  }
}
