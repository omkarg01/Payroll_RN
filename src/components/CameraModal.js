import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { RNCamera } from 'react-native-camera';
import { COLORS } from '../../Assets/colors';

const CameraModal = ({ openCamera, setImg, setTakingPic, setOpenCamera }) => {

    let camera = useRef()

    const takePicture = async () => {
        let options = {
            quality: 0.85,
            fixOrientation: true,
            forceUpOrientation: true,
        };
        setTakingPic(true)
        try {
            console.log("i am working");
            console.log(camera);
            const data = await camera.takePictureAsync(options);
            // const data = await camera.currentPicture(options);
            console.log(data);
            onPicture(data);
        } catch (err) {
            Alert.alert('Error', 'Failed to take picture: ');
            return;
        } finally {
            setTakingPic(false);
            setOpenCamera(false);
        }
    }

    const onPicture = ({ uri }) => {
        setImg(uri);
    }

    return (

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
            // style={{
            //     flex: 1,
            // }}
            />
            <TouchableOpacity onPress={() => takePicture()} style={{ position: 'absolute', alignSelf: 'center', top: '88%' }}>
                <View style={{ height: 70, width: 70, backgroundColor: COLORS.white, borderRadius: 1000, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: '90%', width: '90%', backgroundColor: COLORS.theme, borderRadius: 1000 }}></View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default CameraModal

const styles = StyleSheet.create({})