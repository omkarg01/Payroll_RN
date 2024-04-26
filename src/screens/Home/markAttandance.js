import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, Alert, PermissionsAndroid, Dimensions, ScrollView, StatusBar, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../../Assets/colors';
import { MenuData, SettingData, reUseComponent } from '../../../Assets/ReUsableComponent';
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/EvilIcons'
import { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import axios from 'axios';
import { httpGet } from '../../config/apiServices';
import { companyDesignation, companyLocation, employeeURL } from '../../config/routesConstant';
import Button from '../../components/Button';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AttendanceModal from '../../components/AttendanceModal';
import CameraModal from '../../components/CameraModal';
import LinearGradient from 'react-native-linear-gradient';

const MarkAttandance = ({ img, setImg }) => {
    const [takingPic, settakingPic] = useState(false)
    // const [profileImg, setProfileImg] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [cords, setCords] = useState({})
    const [employee, setEmployee] = useState({})
    const [branch, setBranch] = useState()
    const [designation, setDesignation] = useState()
    const [department, setDepartment] = useState()

    const navigation = useNavigation();

    let camera = useRef()

    const getUserData = async () => {

        try {
            // const result = await httpGet(`${employeeURL}?display_id=${await AsyncStorage.getItem('username')}`)
            const result = await httpGet(employeeURL)
            console.log("user", result);
            setEmployee(result.results[0])
            // setProfileImg(result.results[0].__profile_image)
            setImg(result.results[0].__profile_image)
            console.log("img", result.results[0].__profile_image);

            if (result.results.length !== 0) {
                const result1 = await httpGet(companyLocation + result.results[0].company_location);
                console.log("result1", result1);
                setBranch(result1._location_city);

                const result2 = await httpGet(companyDesignation + result.results[0].company_designation);
                console.log("result2", result2);
                setDepartment(result2._department_name);
                setDesignation(result2._designation_name);
            }


        } catch (err) {
            if (err.response.data.code === "token_not_valid") {
                console.log("error", err.response.data.code);
                alert("Your session has been expired login again");
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'LoginScreen' },
                        ],
                    })
                );
            }
            if (err) {
                console.error(err);
                throw err;
            }
            // console.log("hello", error);
            throw err;
        }
    }


    const takePicture = async () => {

        let options = {
            quality: 0.85,
            fixOrientation: true,
            forceUpOrientation: true,
        };

        settakingPic(true)

        try {
            console.log("i am working");
            const data = await camera.takePictureAsync(options);
            onPicture(data);
        } catch (err) {
            Alert.alert('Error', 'Failed to take picture: ');
            return;
        } finally {
            settakingPic(false);
            setOpenCamera(false);
        }
    }

    const onPicture = ({ uri }) => {
        setImg(uri);
    }

    const getCurrentLocation = async () => {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
        }

        if (Platform.OS === 'android') {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
        }

        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords);
                setCords(position.coords)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    useEffect(() => {
        getUserData();
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Animatable.View
                animation={reUseComponent.commonAnimation}
                style={styles.mainCnt}
            >
                {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[COLORS.primary, COLORS.secondary]} >
                    <StatusBar
                        animated={true}
                        // backgroundColor={COLORS.primary}
                        // barStyle={statusBarStyle}
                        // showHideTransition={statusBarTransition}
                        hidden={false}
                        translucent={false}
                        backgroundColor={'transparent'}
                    />
                </LinearGradient> */}
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
                    {/* <View > */}
                    <Image source={require('../../../Assets/imgs/userIcon.png')}
                        style={{
                            height: 20,
                            width: 20,
                            marginRight: 9
                        }}
                    />

                    {employee && <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, color: COLORS.white }}>{`${employee._first_name} ${employee._last_name}`}</Text>}
                    {/* </View> */}
                </LinearGradient>


                <View style={{ marginTop: 10, marginHorizontal: 0.3 * width }}>
                    {
                        img ?
                            // <View style={{ flex: 1 }}>
                            <Image source={{ uri: img }} size={20} style={styles.profileBtnCnt} />
                            // </View>
                            :
                            <View
                                activeOpacity={0.7}
                                style={styles.btn}>
                                <Icon name='user' size={70} color={COLORS.theme} />
                            </View>
                    }
                </View>

                <View style={{ paddingHorizontal: 14, marginVertical: 10 }}>
                    <View
                        style={styles.textView}>
                        <Text style={styles.text}>Branch : {branch}</Text>
                    </View>
                    <View
                        style={styles.textView}>
                        <Text style={styles.text}>Designation : {designation}</Text>
                    </View>
                    <View
                        style={styles.textView}>
                        <Text style={styles.text}>Department : {department}</Text>
                    </View>

                </View>
                <View style={styles.dataCnt}>
                    {MenuData.map((item, index) => {
                        return (
                            <TouchableOpacity key={item.id} style={styles.btn} onPress={() =>
                                item.id === 1 ? navigation.dispatch(
                                    CommonActions.navigate("Mark Attendence")
                                ) : item.id === 2 ? navigation.dispatch(
                                    CommonActions.navigate("Apply Leave")
                                ) : item.id === 3 ? navigation.dispatch(
                                    CommonActions.navigate("Payslip")
                                ) : item.id === 4 ? navigation.dispatch(
                                    CommonActions.navigate("Increment Letter")
                                ) : item.id === 5 ? navigation.dispatch(
                                    CommonActions.navigate("Leave Report")
                                ) : navigation.dispatch(CommonActions.navigate("Attendence Report"))
                            }>
                                <Image source={item.img} style={styles.btnImg} />
                                <Text style={styles.btnText}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </Animatable.View>
        </SafeAreaView>
    )
}

export default MarkAttandance

var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    mainCnt: {
        elevation: 5,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
        width: '95%',
        marginBottom: 10,
        // borderWidth: 2,
        height: "95%",
    },
    NameCnt: {
        // flex: 1,
        height: 41,
        width: '100%',
        // backgroundColor: COLORS.theme,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnSubCnt: {
        height: '90%',
        width: '90%',
        borderRadius: 1000,
        borderColor: 'white',
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileBtnCnt: {
        height: 115,
        width: 115,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: COLORS.theme,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCnt: {
        height: 80,
        width: 80,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: COLORS.theme,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: COLORS.theme,
    },
    textView: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#C4C4C4',
        paddingVertical: 10,
    },
    dataCnt: {
        // borderWidth: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-evenly",
        paddingHorizontal: 8,
    },
    btn: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.theme,
        height: 92,
        width: 145,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 15,
    },
    btnImg: {
        height: 30,
        width: 30
    },
    btnText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: COLORS.theme,
    }
})