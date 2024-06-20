import React, { Component } from "react";
import { Text, View, TextInput,KeyboardAvoidingView,TouchableOpacity } from "react-native";
import container from "../../Styles/Container/style";
import Color from "../../Config/Color";
import Button from "../../Component/Button/index";
export default class signUP extends Component {
  render() {
    return (
      <KeyboardAvoidingView>
        <View style={{ marginVertical: 20, marginHorizontal: 15,}}>  
          <TextInput
            style={{
              borderColor: Color.steel,
              borderWidth: 0.5,
              borderRadius: 5,
              fontSize: 18,
              marginVertical: 10,
              paddingHorizontal: 15,
              paddingVertical: 7,
              fontFamily:'uber-r',
            }}
            placeholderTextColor={Color.steel}
            placeholder="Username"
            underlineColorAndroid={"transparent"}
            keyboardType="phone-pad" 
            autoCapitalize = 'none'
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
              fontFamily:'uber-r',
            }}
            secureTextEntry={true}
            placeholderTextColor={Color.steel}
            placeholder="Password"
            underlineColorAndroid={"transparent"}
            keyboardType="phone-pad" 
            autoCapitalize = 'none'
          />
        </View>
     
        <Button Text="Login" textStyle={{ fontSize: 15}} onPress={this.props.onPress}/>
   
      </KeyboardAvoidingView>
    );
  }
}
