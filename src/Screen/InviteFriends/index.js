import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share,
  StatusBar
} from "react-native";
import container from "../../Styles/Container/style";
import Header from "../../Component/Header/index";
import style from "./style";
import Button from "../../Component/Button/index";
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Entypo";
export default class index extends Component {
  render() {
    return (
      <View style={container.container}>
      <StatusBar
            barStyle="light-content"
          />
        <ImageBackground
          source={require("../../Image/halfbg.png")}
          style={{ flex: 0.8 }}
        >
          <Header
            title="Invite Friends"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Image
            source={require("../../Image/gift.png")}
            style={{ width: 140, height: 140, alignSelf: "center",margin:10 }}
          />
          <Text style={[style.text, { marginTop: 30,fontSize:18}]}>Invite Friends</Text>
          <Text style={[style.text, { fontSize: 18 }]}>
            Get 2 Coupons each!
          </Text>
          <Text style={[style.text, { margin: 25, textAlign: "center",fontFamily:'uber',fontSize:14,color:Color.whiteSmoke}]}>
            When your friend sign up with your referral code, you’ll both get
            2.0 coupons
          </Text>
        </ImageBackground>

        <View
          style={{
            justifyContent: "flex-end",
            flex: 0.2,
            marginHorizontal: 15
          }}
        >
          <Text
            style={[
              style.text,
              { color: Color.black, alignSelf: "flex-start" }
            ]}
          >
            Share Your Invite Code
          </Text>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#C9C9C9",
              // marginVertical: 5,
              paddingVertical: 20
            }}
          >
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  fontWeight: "600",
                  fontFamily: "uber"
                }}
              >
                ABC123
              </Text>
            </View>
            <View style={{ flex: 0.3,justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  Share.share({
                    message: "au9wdb",
                    title: "Code"
                  })
                }
              >
                <Icon
                  name="share-alternative"
                  size={25}
                  style={{
                    alignSelf: "flex-end",
                    color: Color.purple
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Button
          Text="Invite Friends"
          viewStyle={{
            backgroundColor: Color.purple,
            marginHorizontal: 15,
            marginVertical: 25
          }}
          onPress={() => this.props.navigation.navigate("InviteFriendsList")}
        />
      </View>
    );
  }
}
