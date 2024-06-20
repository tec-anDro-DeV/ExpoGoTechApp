import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Image,FlatList } from "react-native";
import Header from "../../Component/Header/index";
import container from "../../Styles/Container/style";
import Color from "../../Config/Color";
import style from "./style";
import Icon from "react-native-vector-icons/EvilIcons";
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [
            {
                id:'0',
                Source1:require("../../Image/Pic.png"),
                Title:"Johnny Rios",
                Source2:require("../../Image/sent.png"),
               
            },
            {
              id:'01',
              Source1:require("../../Image/Pic4.png"),
              Title:"Alfred Hodges",
              Source2:require("../../Image/add.png"),
            },
            {
              id:'02',
              Source1:require("../../Image/Pic3.png"),
              Title:"Dora Hines",
              Source2:require("../../Image/sent.png"),
            },
            {
              id:'03',
              Source1:require("../../Image/Pic.png"),
              Title:"Samuel Hammond",
              Source2:require("../../Image/sent.png"),
            },
            {
              id:'04',
              Source1:require("../../Image/Pic2.png"),
              Title:"Isaiah McGee",
              Source2:require("../../Image/add.png"),
            },
            {
              id:'05',
              Source1:require("../../Image/Pic3.png"),
              Title:"Mark Holmes",
              Source2:require("../../Image/add.png"),
          },
          {
            id:'06',
            Source1:require("../../Image/Pic.png"),
            Title:"D  N",
            Source2:require("../../Image/sent.png"),
          },
          ]
        };
      }
      _keyExtractor = (item, index) => item.id;
      _renderItem = ({ item }) => (
            <View
              style={{
                flexDirection: "row",
                paddingVertical:5,
                backgroundColor:Color.white,
              }}
            >
              <View style={[style.imageProfileView, { flex: 0.15,marginHorizontal:10}]}>
                <Image
                  source={item.Source1}
                  style={style.imageProfile}
                />
              </View>
              <View style={{flexDirection:'row',flex:0.85,borderBottomColor:Color.steel,borderBottomWidth:0.5,marginHorizontal:5}}>
              <View style={{ justifyContent: "center",flex:0.80}}>
                <Text style={{ fontSize: 14, fontFamily: "uber-b",}}>
                {item.Title}
                </Text>
              </View>
              <View style={{flex: 0.20,justifyContent:'center'}}>
              <TouchableOpacity>
              <View
                style={[
                  style.imageProfileView,
                  {  borderRadius: 0, height: 30, width: 30,justifyContent: "flex-end",}
                ]}
              >
                <Image
                  source={item.Source2}
                  style={style.imageProfile}
                />
                </View>
                </TouchableOpacity>
                </View>
              </View>
            </View>
       
      );
  render() {
    return (
      <View style={container.container}>
      {/* Top view */}
        <View style={{ backgroundColor: Color.black }}>
          <Header
            title="Invite Friends"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <View
            style={{
              backgroundColor: Color.cloud,
              marginHorizontal:15,
              marginBottom:15,
              borderRadius: 10,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 0.1, justifyContent: "center" }}>
              <TouchableOpacity>
                <Icon
                  name="search"
                  size={25}
                  style={{
                    color: Color.white,
                    alignSelf: "center"
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9, justifyContent: "center" }}>
              <TextInput
                style={{ color: Color.white, marginVertical: 5, padding: 5 }}
                placeholder="Search"
              />
            </View>
          </View>                                                  
          {/* Bottom View */}
          <FlatList
              data={this.state.data}
              horizontal={false}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
        </View>
      </View>
    );
  }
}
