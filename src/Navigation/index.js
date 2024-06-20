import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import Slider from "../Screen/Slider/index";
import Welcome from "../Screen/Welcome/index";
import SignUp from "../Screen/SignUp/index";
import OTP from "../Screen/OTP/index";
import Home from "../Screen/Home";
import Details from "../Screen/Details/index";
import New from "../Screen/New/index";
import Map from "../Screen/Map/index";
import List from "../Screen/List/index";
import HomeUp from "../Screen/HomeUp/index";
import Model from "../Component/Model/index";
import HomeLetsGo from "../Screen/HomeLetsGo/index";
import BookingReq from "../Screen/BookingReq/index";
import BookingReqUp from "../Screen/BookingReqUp/index";
import Promocode from "../Screen/Promocode/index";
import Payment from "../Screen/Payment/index";
import RideReqConfirm from "../Screen/RideReqConfirm/index";
import SideMenu from "../Screen/SideMenu/index";
import MyWallet from "../Screen/MyWallet/index";
import History from "../Screen/History";
import Notification from "../Screen/Notification/index";
import InviteFriends from "../Screen/InviteFriends/index";
import Settings from "../Screen/Settings/index";
import Logout from "../Screen/Logout/index";
import RideReqCancel from "../Screen/RideReqCancel/index";
import HistoryList from "../Component/HistoryList/indx";
import Chat from "../Screen/Chat/index";
import Rating from "../Screen/Rating/index";
import Tips from "../Screen/Tips/index";
import InviteFriendsList from "../Screen/InviteFriendsList/index";
import MyAccount from '../Screen/MyAccount/index';
import AuthLoadingScreen from '../Screen/AuthLoadingScreen/index';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AppStack = () => (
    <AuthStack.Navigator initialRouteName="List" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="New" component={New} />
        <Stack.Screen name="Map" component={Map} />
    </AuthStack.Navigator>
)

const Navigation = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Starter" component={AuthLoadingScreen} />
        <Stack.Screen name="App" component={AppStack} />
        <Stack.Screen name="Auth" component={SignUp} />
    </Stack.Navigator>
);

export default Navigation;

// const AppStack = createStackNavigator({ List, Home, Details, New, Map });
// const AuthStack = createStackNavigator({ SignUp });

// export default createAppContainer(createSwitchNavigator(
//     {
//         Starter: AuthLoadingScreen,
//         App: AppStack,
//         Auth: AuthStack
//     },
//     {
//         initialRouteName: 'Starter'
//     }
// ));