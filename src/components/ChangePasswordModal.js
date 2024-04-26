import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { COLORS } from '../../Assets/colors';
import LinearGradient from 'react-native-linear-gradient';

const ChangePasswordModal = ({ navigation, route, setPasswordModal, passwordModal }) => {

    const onSubmit = () => {
        setPasswordModal(false)
        passwordChange()
    }

    const passwordChange = () => {
        ToastAndroid.showWithGravity(
            "Password Changed Successfully",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={passwordModal}
            onRequestClose={() => {
                setPasswordModal(false)
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
                        <Text style={styles.headerTxt}>{"Change Password"}</Text>
                        <TouchableOpacity onPress={() => setPasswordModal(false)}>
                            <Ionicons
                                name={'close'}
                                size={24}
                                color={COLORS.white}
                                style={styles.headerIcon} />
                        </TouchableOpacity>
                        {/* </View> */}
                    </LinearGradient>
                    {/* CHANGE PASSWORD DESIGN */}
                    <View style={{ paddingHorizontal: 15, marginTop: 15, marginBottom: 40 }}>
                        {[1, 2, 3].map((item, index) => {
                            return (
                                <View style={{ marginTop: 15 }}>
                                    <TextInput
                                        placeholder='Old Password'
                                        secureTextEntry={true}
                                        style={styles.resetInput}
                                        placeholderTextColor={COLORS.inputFontGrey}
                                    />
                                    <View style={styles.eyeBtnCnt}>
                                        <TouchableOpacity>
                                            <Ionicons
                                                name={'eye-off'}
                                                size={24}
                                                color={COLORS.theme}
                                                style={{ top: '45%', marginRight: 15 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    {/* <LineareGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.resetPswCnt} colors={[COLORS.primary, COLORS.secondary]} > */}
                    <TouchableOpacity onPress={onSubmit}>
                        <View style={styles.resetPswCnt} >
                            <Text style={styles.btnTxt}>SUBMIT</Text>
                        </View>
                    </TouchableOpacity>
                    {/* </LineareGradient> */}
                </View>
            </Animatable.View>
        </Modal>
    )
}

export default ChangePasswordModal

const styles = StyleSheet.create({
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
        alignItems: 'center',
        borderWidth: 1,
        // flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // paddingHorizontal: 25
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
        tintColor: COLORS.white,
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