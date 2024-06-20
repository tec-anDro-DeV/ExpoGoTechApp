import {Dimensions} from 'react-native'
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export default{
    cardView:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        marginTop: 25,
        flex: 1
      }
      ,  
  open_bnt :{ 
      flex: 0.5,
      width: '100%',
      justifyContent: 'center',
      marginTop : 0,
      alignItems: 'center'
  },
  open_bnt_bg : {
     width: '100%',
     backgroundColor: 'gray', 
     height: '100%',
  },
  icon_image: {
    height: 25,
    width: 25,
    alignSelf: "center",    
    resizeMode: "contain"
  }
}