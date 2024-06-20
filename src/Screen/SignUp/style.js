import {Dimensions} from 'react-native'
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
export default{
    cardView:{
        top: 0,
        left: 0,
        right: 0,
        //marginTop: height / 3,
        height: 300,
        marginHorizontal: 20,
        backgroundColor: Color.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
        //  borderColor: Color.steel,
        //  borderWidth: 2
      }
}