// In App.js in a new project

import * as React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AttendenceReport from './src/screens/Menu/AttendenceReport';
import { COLORS } from './Assets/colors';
import Setting from './src/screens/setting/Setting';
import MarkAttandance from './src/screens/Home/markAttandance';
import SplashScreen from './src/screens/Splash/SplashScreen';
import Login from './src/screens/auth/Login';
import * as Animatable from 'react-native-animatable';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { API_URL } from '@env';
import Payslip from './src/screens/Menu/Payslip';
import IncrementLetter from './src/screens/Menu/IncrementLetter';
import ApplyLeave from './src/screens/Menu/ApplyLeave';
import { stackStyle } from './Assets/ReUsableComponent';
import MarkAttendence from './src/screens/Menu/MarkAttendence';
import LeaveReport from './src/screens/Menu/LeaveReport';
import Logout from './src/screens/setting/Logout';
import LogoutModal from './src/components/LogoutModal';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function App() {
  const [logoutModal, setLogoutModal] = React.useState(false);


  const _renderText = (focused, text) => {
    return (
      focused &&
      <Animatable.Text
        animation={{
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          }
        }}
        style={[{
          // borderWidth: 2,
          alignSelf: 'center',
          paddingHorizontal: 7,
          textAlign: 'center',
          marginBottom: '20%',
          fontFamily: 'Roboto-Medium',
          color: COLORS.theme,
          top: "5%"
        }]}>
        {text}
        {/* <Text style={{ color: COLORS.theme }}>
          {text === 'Setting' || text === 'Logout' ? ' -------------' : null}
        </Text> */}
      </Animatable.Text>
    );
  };

  const _renderIcon = (focused, text, index) => {
    return (
      <>
        <View style={[{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }]}>
          {
            <View>
              <Image
                style={[{
                  height: 20,
                  width: 20,
                  tintColor: focused ? COLORS.theme : 'grey',
                  top: 2
                },
                ]}

                source={
                  text === "home" ?
                    require('./Assets/imgs/user.png')
                    :
                    text === "report" ?
                      require('./Assets/imgs/pie-chart.png')
                      :
                      text === "setting" ?
                        require('./Assets/imgs/settings.png')
                        :
                        require('./Assets/imgs/user.png')
                } />

            </View>
          }
        </View>
      </>
    );
  };

  function EmptyScreen() {
    const [logoutModal, setLogoutModal] = React.useState(false);
    React.useEffect(() => {
      setLogoutModal(true);
    }, [])
    return (
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
    );
  }

  const HomeStack = () => {
    const [img, setImg] = React.useState(null);
    console.log("img", img);
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 85,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            elevation: 9,
          }
        }}
      >
        <Tab.Screen
          name="Home"
          children={() => <MarkAttandance img={img} setImg={setImg} />}
          // component={MarkAttandance}
          options={{
            headerShown: false,
            tabBarColor: '#3333cc',
            tabBarLabel: ({ focused }) => _renderText(focused, 'Menu'),
            tabBarIcon: ({ focused }) => _renderIcon(focused, 'home', 1),
          }}
        />


        <Tab.Screen
          name="Setting"
          // component={Setting}
          children={() => <Setting img={img} setImg={setImg} />}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => _renderText(focused, 'Setting'),
            tabBarIcon: ({ focused }) => _renderIcon(focused, 'setting', 2),
          }}
        />

        <Tab.Screen
          name="Logout"
          component={Logout}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => _renderText(focused, 'Logout'),
            tabBarIcon: ({ focused }) => _renderIcon(focused, 'logout', 3),

          }}
          listeners={{
            tabPress: (e) => {
              setLogoutModal(true)
            }
          }}
        />
      </Tab.Navigator>
    )
  }


  const MyCustomLeftComponent = (props) => {
    return (
      <View style={{ marginLeft: 5 }}>
        <Ionicons name='arrow-back-outline' size={24} color={COLORS.white} onPress={() => {
          props.navigation.dispatch(CommonActions.goBack());
        }} />
      </View>
    );
  }

  const MyCustomCenterComponent = ({ content }) => {
    let file = content.icon === "file" ? require("./Assets/imgs/pie-chart.png") : require("./Assets/imgs/user.png");
    console.log("mycentercomponent", content);
    return (
      <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
        <Image
          style={{ width: 20, height: 20, tintColor: COLORS.white }}
          source={file}
        />
        <Text style={{ color: COLORS.white, fontFamily: 'Roboto-Medium', fontSize: 16, marginLeft: 10 }}>{content.title}</Text>
      </View>
    );
  }


  const GradientHeader = (props) => {
    console.log("Gradient Props", props);
    return (
      <Header
        ViewComponent={LinearGradient} // Don't forget this!
        leftComponent={<MyCustomLeftComponent {...props} />}
        centerComponent={<MyCustomCenterComponent content={props.content} />}
        linearGradientProps={{
          colors: [COLORS.primary, COLORS.secondary],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 }
        }}
        containerStyle={{
          flexDirection: 'row',
          height: 95,
          alignItems: "center",
        }}
      />
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
        <Stack.Screen name="LoginScreen" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeStack} />
        <Stack.Screen name="Payslip" options={{
          header: props => <GradientHeader {...props} content={{ title: "Payslip", icon: "file" }} />,
        }} component={Payslip} />
        <Stack.Screen name="Increment Letter" options={{
          header: props => <GradientHeader {...props} content={{ title: "Increment Letter", icon: "file" }} />,
        }} component={IncrementLetter} />
        <Stack.Screen name="Apply Leave" options={{
          header: props => <GradientHeader {...props} content={{ title: "Apply Leave", icon: "user" }} />,
        }} component={ApplyLeave} />
        <Stack.Screen name="Leave Report" options={{
          header: props => <GradientHeader {...props} content={{ title: "Leave Report", icon: "user" }} />,
        }} component={LeaveReport} />
        <Stack.Screen name="Attendence Report" options={{
          header: props => <GradientHeader {...props} content={{ title: "Attendence Report", icon: "user" }} />,
        }} component={AttendenceReport} />
        <Stack.Screen name="Mark Attendence" options={{
          header: props => <GradientHeader {...props} content={{ title: "Mark Attendance", icon: "user" }} />,
        }} component={MarkAttendence} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;

