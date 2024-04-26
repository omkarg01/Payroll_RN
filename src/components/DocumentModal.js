import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { COLORS } from '../../Assets/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const DocumentModal = ({ showDocumentModal, source, headerTitle, setShowDocumentModal }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showDocumentModal}
            onRequestClose={() => {
                null
                // Alert.alert("Modal has been closed.");
                // setModalVisible(!modalVisible);.
                setShowDocumentModal(false)
            }}
        >
            <View
                activeOpacity={1}
                style={styles.modalView}
            >
                <View style={styles.resetPasswordCnt}>
                    {/* HEADER */}
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
                        {/* <View style={styles.NameCnt}> */}
                        <Text style={styles.headerTxt}>{headerTitle}</Text>
                        <TouchableOpacity onPress={() => setShowDocumentModal(false)}>
                            <Ionicons
                                name={'close'}
                                size={24}
                                color={COLORS.white}
                                style={styles.headerIcon} />
                        </TouchableOpacity>
                        {/* </View> */}
                    </LinearGradient>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image
                            style={{ width: '100%', height: 600, resizeMode: 'stretch' }}
                            source={{ uri: source }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DocumentModal

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
    btn: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.theme,
        height: 117,
        width: 150,
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
        width: '95%',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding: 10
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