import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS } from '../../Assets/colors'
import { RNCamera } from 'react-native-camera'
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/EvilIcons'
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CameraModal from './CameraModal';

const CustomModal = () => {

    const [takingPic, settakingPic] = useState(false)
    const [img, setImg] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);
    const [cords, setCords] = useState({})
    const [attendanceModal, setAttendanceModal] = useState(false);
    let camera = useRef()

    const takePicture = async () => {

        let options = {
            quality: 0.85,
            fixOrientation: true,
            forceUpOrientation: true,
            // base64: true,
        };

        settakingPic(true)

        let data = null;
        try {
            console.log("hello i am trying");
            data = await camera.takePictureAsync(options);
            console.log("camera", data);
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

    return (
        <>
            {openCamera && <CameraModal takePicture={takePicture} camera={camera} openCamera={openCamera} setOpenCamera={setOpenCamera} />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={attendanceModal}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    // setModalVisible(!modalVisible);.
                    setAttendanceModal(false)
                }}
            >
                <Animatable.View
                    activeOpacity={1}
                    style={styles.modalView}
                >
                    <View style={styles.resetPasswordCnt}>
                        {/* HEADER */}
                        <View style={styles.NameCnt}>
                            <Text style={styles.headerTxt}>{"Mark Attendance"}</Text>
                            <TouchableOpacity onPress={() => setAttendanceModal(false)}>
                                <Ionicons
                                    name={'close'}
                                    size={24}
                                    color={COLORS.white}
                                    style={styles.headerIcon} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 31, paddingHorizontal: 25 }}>
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
                            <View style={styles.btnCnt}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.btnSubCnt}
                                    onPress={() => getCurrentLocation()}
                                >
                                    <Image source={require('../../Assets/imgs/smartphone.png')} style={{ height: '65%', width: '65%', tintColor: cords.latitude && cords.longitude ? 'green' : COLORS.theme }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.resetPswCnt} onPress={() => setAttendanceModal(false)}>
                            <Text style={styles.btnTxt}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </Modal>
            {true && <TouchableOpacity onPress={() => setAttendanceModal(true)}>
                <View style={{ backgroundColor: COLORS.theme, borderRadius: 10, marginVertical: 15 }}>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Image source={require('../../Assets/imgs/userIcon.png')} style={{ height: 26, width: 26, marginVertical: 9, marginRight: 13 }} />
                        <Text style={{ alignSelf: 'center', color: COLORS.white, fontFamily: 'Roboto-Medium' }}>Mark Attandance</Text>
                    </View>
                </View>
            </ TouchableOpacity>}
        </>
    )
}

export default CustomModal

const styles = StyleSheet.create({
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
    },
    mainCnt: {
        elevation: 3,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
        width: '95%',
        flex: 0.98
    },
    dataCnt: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 25
    },
    btn: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.theme,
        height: 117,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    btnImg: {
        height: 45,
        width: 45
    },
    NameCnt: {
        // height: 41,
        width: '100%',
        backgroundColor: COLORS.theme,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerIcon: {
        // height: 18,
        // width: 18,
        marginVertical: 13,
        // tintColor: COLORS.white,
        marginLeft: 14,
        marginRight: 10
    },
    headerTxt: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: COLORS.white,
    },
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetPasswordCnt: {
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        // padding: 15
    },
    resetInput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.grey,
        paddingHorizontal: 15,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: COLORS.inputFontGrey
    },
    eyeBtnCnt: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    resetPswCnt: {
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        backgroundColor: COLORS.theme,
        borderRadius: 10
    },
    btnTxt: {
        paddingVertical: 13,
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: COLORS.white
    },
    logoutTxt: {
        marginTop: 15,
        marginBottom: 9,
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: 'black'
    }
})