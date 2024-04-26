import { View, Text, Modal, StyleSheet, Image, TouchableOpacity, Alert, PermissionsAndroid, StatusBar, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../../Assets/colors';
import { reUseComponent } from '../../../Assets/ReUsableComponent';
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/EvilIcons'
import Geolocation from 'react-native-geolocation-service';
import { CommonActions, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const MarkAttendence = () => {
    const [hidden, setHidden] = useState(false);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
    const [statusBarTransition, setStatusBarTransition] = useState(
        TRANSITIONS[0],
    );

    const [takingPic, settakingPic] = useState(false)
    const [img, setImg] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [cords, setCords] = useState({})


    let camera = useRef()

    const navigation = useNavigation();

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
                setCords(position.coords);
                locationDetected();
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const pictureCaptured = () => {
        ToastAndroid.showWithGravity(
            "Your picture has been captured.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }

    const locationDetected = () => {
        ToastAndroid.showWithGravity(
            "Your location has been detected.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    const attendanceMark = () => {
        // ToastAndroid.showWithGravity(
        //     "Your attendance has been marked!",
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER,
        // );

        Alert.alert('Mark Attendance', 'Your attendance has been marked!', [
            {
                text: 'OK', onPress: () => navigation.dispatch(CommonActions.goBack()),
            },
        ]);
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[COLORS.primary, COLORS.secondary]} >
                <StatusBar
                    animated={true}
                    // backgroundColor={COLORS.primary}
                    // barStyle={statusBarStyle}
                    // showHideTransition={statusBarTransition}
                    hidden={hidden}
                    translucent={true}
                    backgroundColor={'transparent'}
                />
            </LinearGradient> */}
            {openCamera
                ?
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openCamera}
                    onRequestClose={() => {
                        setOpenCamera(false);
                    }}
                >
                    <RNCamera
                        ref={ref => {
                            camera = ref;
                        }}
                        captureAudio={false}
                        style={{ flex: 1 }}
                        type={RNCamera.Constants.Type.front}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        activeOpacity={0.5}
                    />
                    <TouchableOpacity onPress={() => takePicture()} style={{ position: 'absolute', alignSelf: 'center', top: '88%' }}>
                        <View style={{ height: 70, width: 70, backgroundColor: COLORS.white, borderRadius: 1000, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: '90%', width: '90%', backgroundColor: COLORS.theme, borderRadius: 1000 }}></View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                :
                <Animatable.View
                    animation={reUseComponent.commonAnimation}
                    style={styles.mainCnt}
                >
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 16, color: COLORS.white }}>Read the instructions :</Text>
                    </LinearGradient>
                    <View style={{ paddingHorizontal: 14, marginVertical: 10 }}>
                        <View style={{ borderBottomWidth: 1.5, borderBottomColor: "#C4C4C4" }}>
                            <View
                                style={styles.textView}>
                                <Text style={styles.text}>1. Please make sure your face is clearly visible in the picture.</Text>
                            </View>
                            <View style={{ marginVertical: 30, alignItems: "center" }}>
                                <TouchableOpacity
                                    onPress={() => setOpenCamera(true)}
                                    activeOpacity={0.5}
                                    style={styles.btnCnt}>
                                    {
                                        img ?
                                            <Image source={{ uri: img }} style={{ height: '100%', width: '100%', borderRadius: 1000 }} />
                                            :
                                            <View
                                                activeOpacity={0.7}
                                                style={styles.btnSubCnt}>
                                                <Icon name='user' size={70} color={COLORS.theme} />
                                            </View>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ borderBottomWidth: 1.5, borderBottomColor: "#C4C4C4" }}>
                            <View
                                style={styles.textView}>
                                <Text style={styles.text}>2. Register your Geolocation. </Text>
                            </View>
                            <View style={{ alignItems: "center", marginVertical: 30 }}>
                                <View style={styles.btnCnt}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.btnSubCnt}
                                        onPress={() => getCurrentLocation()}
                                    >
                                        <Image source={require('../../../Assets/imgs/smartphone.png')} style={{ height: '65%', width: '65%', tintColor: cords.latitude && cords.longitude ? 'green' : COLORS.theme }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.textView}>
                            <Text style={styles.text}>3. Press on the MARK ATTENDANCE. </Text>
                        </View>
                        <View style={{ backgroundColor: COLORS.btn, borderRadius: 10, marginVertical: 15 }}>
                            <TouchableOpacity onPress={() => attendanceMark()}>
                                {/* <LinearGradient  style={{ backgroundColor: COLORS.btn, borderRadius: 10, marginVertical: 15 }} colors={[COLORS.btn]} > */}
                                {/* <View style={{ backgroundColor: COLORS.theme, borderRadius: 10, marginVertical: 15 }}> */}
                                <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <Image source={require('../../../Assets/imgs/userIcon.png')} style={{ height: 26, width: 26, marginVertical: 9, marginRight: 13 }} />
                                    <Text style={{ alignSelf: 'center', color: COLORS.white, fontFamily: 'Roboto-Medium' }}>MARK ATTENDANCE</Text>
                                    {/* </View> */}
                                </View>
                                {/* </LinearGradient> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animatable.View>
            }
        </SafeAreaView>

    )
}

export default MarkAttendence

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        color: COLORS.theme,
    },
    textView: {
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
        // borderColor: '#C4C4C4',
        paddingTop: 20,
    },
    mainCnt: {
        elevation: 5,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
        width: '95%'
    },
    NameCnt: {
        height: 41,
        width: '100%',
        backgroundColor: COLORS.theme,
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
    btnCnt: {
        height: 115,
        width: 115,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: COLORS.theme,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    }
})