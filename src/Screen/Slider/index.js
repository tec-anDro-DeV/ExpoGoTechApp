import React, { Component } from 'react'
import { Text, View ,StyleSheet,Image,TouchableOpacity,ImageBackground} from 'react-native'
import Swiper from 'react-native-swiper';
import styles from './style';
import Button from '../../Component/Button/index'
import Color from '../../Config/Color'
export default class index extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper}
       showsButtons={false} dot={
        <View
          style={styles.deActiveDot}
        />
      }
      activeDot={
        <View
          style={styles.activeDot}
        />
      } >
        <View style={styles.slide1}>
          <ImageBackground style={styles.image} source={require('../../Image/slide1.png')}>
          <Text style={styles.text}>Test your Ride</Text>
          <Text style={styles.contentText}>Request nearby taxi driver and get pickup within 10 minutes.</Text>
        </ImageBackground>
        </View>
        <View style={styles.slide2}>
        <ImageBackground style={styles.image} source={require('../../Image/slide2.png')}>
          <Text style={styles.text}>Confirm your Ride</Text>
          <Text style={styles.contentText}>Driver will confirm your ride and notify by notification within 5 minutes.</Text>
        </ImageBackground>
        </View>
        <View style={styles.slide3}>
        <ImageBackground style={styles.image} source={require('../../Image/slide3.png')}>
          <Text style={styles.text}>Track your taxi</Text>
          <Text style={styles.contentText}>You can track taxi by app map anytime, anywhere.</Text>
 
          <Button Text='GET STARTED!' viewStyle={{marginTop:30,backgroundColor:Color.white,marginHorizontal:50}}
            textStyle={{color:Color.black}}
            onPress={()=>this.props.navigation.navigate('SignUp')}
          />
         
        </ImageBackground>
        </View> 
      </Swiper>
    )
  }
}
