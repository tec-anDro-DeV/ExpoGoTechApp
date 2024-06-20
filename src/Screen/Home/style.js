import { Dimensions } from "react-native";
import Color from "../../Config/Color";
let width = Dimensions.get("window").width;
export default {
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    width: width
  },
  subContainerView: {
    backgroundColor: Color.white,
    width: "100%",
    borderColor: Color.steel,
    borderWidth: 1,
    borderRadius: 15,
    opacity: 1,
    marginBottom: 0,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#CBCBCB",
    shadowOpacity: 0.3,
    elevation: 3
  },
  view: { flexDirection: "row", alignSelf: "center" },
  optionView: { flexDirection: "column", flex: 0.35 },
  imageProfileView: {
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    margin: 5
  },
  imageProfile: { flex: 1, alignSelf: "center", resizeMode: "contain" },
  image: {
    height: 40,
    width: 60,
    alignSelf: "center",
    marginVertical: 5,
    resizeMode: "contain"
    
  },
  textProfileView: {
    flexDirection: "column",
    flex: 1,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  textProfile: {
    fontFamily: "uber-b",
    color: Color.black,
    fontSize: 14,
    marginTop: 0,
    marginLeft: 10,
    justifyContent: "center"
  },
  titleText: {
    fontSize: 12,
    fontFamily: "uber",
    marginVertical: 3,
    color: Color.steel
  },
  titleText2: {
    fontSize: 12,
    fontFamily: "uber",
    marginVertical: 3,
    alignSelf: "center",
    color: Color.steel
  },
  text: {
    fontSize: 12,
    fontFamily: "uber",
    alignSelf: "center",
    marginVertical: 3,
    color: Color.black
  },  
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
  }
};