import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../Assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { reUseComponent } from '../../Assets/ReUsableComponent';

const LogoutModal = ({ logoutModal, setLogoutModal }) => {

    const navigation = useNavigation();

    const logoutUser = async () => {
        try {
            AsyncStorage.clear();

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'SplashScreen' },
                    ],
                })
            );
        } catch (error) {
            throw error
        }
    }

    const goToLastScreen = () => {
        setLogoutModal(false);
        navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [
                { name: 'HomeScreen' },
            ],
        }));
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={logoutModal}
            onRequestClose={() => {
                null
                // Alert.alert("Modal has been closed.");
                // setModalVisible(!modalVisible);.
                setLogoutModal(false)
            }}
        >
            <Animatable.View
                activeOpacity={1}
                style={styles.modalView}
            >
                <View style={styles.resetPasswordCnt}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
                        {/* <View style={styles.NameCnt}> */}
                        <Text style={styles.headerTxt}>{"Logout"}</Text>
                        <TouchableOpacity onPress={() =>
                            goToLastScreen()
                        }>
                            <Ionicons
                                name={'close'}
                                size={24}
                                color={COLORS.white}
                                style={styles.headerIcon} />
                        </TouchableOpacity>
                        {/* </View> */}
                    </LinearGradient>
                    <Text style={[styles.logoutTxt, { marginLeft: 20, marginBottom: 36, color: '#4F4F4F', fontSize: 16 }]}>Are you sure you want to log out?</Text>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() =>
                                goToLastScreen()
                            }
                            style={[styles.btn]}>
                            <Text style={styles.btnTxt}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => logoutUser()}
                            style={[styles.btn]}
                        >
                            <Text style={styles.btnTxt}>YES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </Modal >
    )
}

export default LogoutModal

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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 25
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
    btn: {
        marginHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 30,
        backgroundColor: COLORS.btn,
        borderRadius: 10,
        marginHorizontal: 1,
        width: 145,
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
