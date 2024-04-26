import {
    View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, Alert, ToastAndroid, SafeAreaView,
    Platform,
    PermissionsAndroid,
} from 'react-native'
import React, { useRef } from 'react'
import { COLORS } from '../../../Assets/colors'
import * as Animatable from 'react-native-animatable';
import { Header, reUseComponent, SettingData } from '../../../Assets/ReUsableComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import LogoutModal from '../../components/LogoutModal';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import CameraModal from '../../components/CameraModal';
import Icon from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-picker';
// import uuid from 'react-native-uuid';

import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import { justUploadDocs, leaveURL, userURL } from '../../config/routesConstant';
import { httpPost, httpPostDocs, httpPut } from '../../config/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const Setting = ({ navigation, route, img, setImg }) => {
    console.log("img", img);
    const [passwordModal, setPasswordModal] = useState(false);
    const [pictureModal, setPictureModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    const [takingPic, setTakingPic] = useState(false)
    // const [img, setImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [openCamera, setOpenCamera] = useState(false);

    const [formData, setFormData] = useState();

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
            includeBase64: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);
                let result = response.assets[0];

                if (result.didCancel) {
                    alert('User cancelled camera picker');
                    return;
                } else if (result.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (result.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (result.errorCode == 'others') {
                    alert(result.errorMessage);
                    return;
                }
                console.log('base64 -> ', result.base64);
                // console.log('uri -> ', result.uri);
                // console.log('width -> ', result.width);
                // console.log('height -> ', result.height);
                // console.log('fileSize -> ', result.fileSize);
                // console.log('type -> ', result.type);
                // console.log('fileName -> ', result.fileName);

                // const [fileName, extension] = result.fileName.split(".");
                // console.log(fileName, extension);
                // const modifiedFile = new File(
                //     result,
                //     fileName.substring(0, 6) + "." + extension,
                //     { type: result.type }
                // );
                console.log(result);
                creatFormData(result);
            });
        }
    };

    const creatFormData = (result) => {
        const formData = new FormData();
        formData.append("doc_file", {
            uri: result.uri,
            type: result.type,
            name: result.fileName,
        });

        console.log("formaData", formData);
        setImg(result.uri);
        setFormData(formData);
    }

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            let result = response.assets[0];

            if (result.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (result.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (result.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (result.errorCode == 'others') {
                alert(result.errorMessage);
                return;
            }
            console.log('base64 -> ', result.base64);
            console.log('uri -> ', result.uri);
            console.log('width -> ', result.width);
            console.log('height -> ', result.height);
            console.log('fileSize -> ', result.fileSize);
            console.log('type -> ', result.type);
            console.log('fileName -> ', result.fileName);
            // setFilePath(response);
            creatFormData(result)
        });
    };


    const updateProfilePic = async () => {
        try {
            const data = await httpPostDocs(justUploadDocs, formData);
            console.log("justUploadDocs", data);

            const userData = JSON.parse(await AsyncStorage.getItem("userData"));
            console.log("userData", userData);

            // updating userdata with new profile image
            userData.profile_image = data.doc_file;
            // userData.profile_image = "https://payroll-appserver.s3.amazonaws.com/static/8cf2e5.jpg";

            const userResult = await httpPut(userURL + userData.id + "/", userData);
            console.log("userResult", userResult);

            // await AsyncStorage.put("userData", JSON.stringify(userData));
        } catch (error) {
            throw error;
        }
        setPictureModal(false);
        ToastAndroid.showWithGravity(
            "Profile Picture Updated Successfully.",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }

    return (
        <Animatable.View
            animation={reUseComponent.commonAnimation}
            style={styles.mainCnt}
        >
            <Header Title={'Setting'} icon={require('../../../Assets/imgs/settings.png')} />
            <View style={styles.dataCnt}>
                {SettingData.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.btn} onPress={() =>
                            item.id === 1 ?
                                setPasswordModal(true)
                                :
                                item.id === 2 ?
                                    setPictureModal(true)
                                    : null

                        }>
                            <Image source={item.img} style={styles.btnImg} />
                            <Text style={styles.btnText}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

            {openCamera && <CameraModal openCamera={openCamera} setImg={setImg} setTakingPic={setTakingPic} setOpenCamera={setOpenCamera} />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={pictureModal}
                onRequestClose={() => {
                    setPictureModal(false)
                }}
            >
                <Animatable.View
                    activeOpacity={1}
                    style={styles.modalView}
                >
                    <View style={styles.resetPasswordCnt}>
                        {/* HEADER */}
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
                            {/* <View style={styles.NameCnt}> */}
                            <Text style={styles.headerTxt}>{"Change Profile Picture"}</Text>
                            <TouchableOpacity onPress={() => setPictureModal(false)}>
                                <Ionicons
                                    name={'close'}
                                    size={24}
                                    color={COLORS.white}
                                    style={styles.headerIcon} />
                            </TouchableOpacity>
                            {/* </View> */}
                        </LinearGradient>
                        {/* CHANGE PASSWORD DESIGN */}
                        <View style={{ marginVertical: 31, alignSelf: 'center', justifyContent: "center" }}>
                            <View style={{ justifyContent: "center", flexDirection: "row", marginBottom: 30 }}>
                                <View
                                    // onPress={() => setOpenCamera(true)} 
                                    // onPress={() => captureImage('photo')}
                                    // activeOpacity={0.5}
                                    style={styles.btnCnt}>
                                    {
                                        img ?
                                            <Image source={{ uri: img }} style={{ height: '100%', width: '100%', borderRadius: 1000, borderWidth: 4, borderColor: COLORS.black }} />
                                            :
                                            <View
                                                activeOpacity={0.7}
                                                style={styles.btnSubCnt}>
                                                <Icon name='user' size={70} color={COLORS.theme} />
                                            </View>
                                    }
                                </View>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.buttonStyle}
                                onPress={() => captureImage('photo')}>
                                <Text style={styles.textStyle}>
                                    Launch Camera for Image
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.buttonStyle}
                                onPress={() => chooseFile('photo')}>
                                <Text style={styles.textStyle}>Choose Image</Text>
                            </TouchableOpacity>
                        </View>
                        {/* </View> */}
                        <TouchableOpacity style={styles.resetPswCnt} onPress={updateProfilePic}>
                            <Text style={styles.btnTxt}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>
            </Modal>
            <ChangePasswordModal passwordModal={passwordModal} setPasswordModal={setPasswordModal} />
        </Animatable.View>
    )
}

export default Setting

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainCnt: {
        elevation: 3,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
        width: '95%',
        flex: 0.98,
        // borderWidth: 2,
    },
    dataCnt: {
        flex: 1,
        // alignItems: 'center',
        // borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
    },
    textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
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
    btnText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: COLORS.theme,
        textAlign: 'center',
    },
    btnCnt: {
        height: 115,
        width: 115,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: COLORS.theme,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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
        // borderWidth: 1,
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
        backgroundColor: COLORS.btn,
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


