import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../../Assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { LogoutData, Header, reUseComponent } from '../../../Assets/ReUsableComponent';
import * as Animatable from 'react-native-animatable';
import LogoutModal from '../../components/LogoutModal';

const Logout = ({ navigation }) => {
    const [logoutModal, setLogoutModal] = React.useState(false);


    useEffect(() => {
        console.log("hello");
        setLogoutModal(true);
    }, [])

    return (
        <>
            {/* <Animatable.View
                animation={reUseComponent.commonAnimation}
                style={styles.mainCnt}
            > */}
                {/* <Header Title={'Logout'} icon={require('../../../Assets/imgs/user.png')} />
            <View style={styles.dataCnt}>
                <TouchableOpacity style={styles.btn} onPress={() => setLogoutModal(true)}>
                    <Image source={require("../../../Assets/imgs/power-off.png")} style={styles.btnImg} />
                    <Text>
                        {"Log out"}
                    </Text>
                </TouchableOpacity>
            </View> */}
                <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
            {/* </Animatable.View > */}
        </>
    )
}

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
        padding: 15
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

export default Logout