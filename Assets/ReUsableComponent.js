import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS } from './colors'
import LinearGradient from 'react-native-linear-gradient';

export const reUseComponent = {
    commonAnimation: {
        from: {
            opacity: 0,
            top: 100
            // width: '0%',
            // height: 0
        },
        to: {
            opacity: 1,
            top: 0
            // height: 395,
            // width: '95%'
        }
    }
}

export const Header = ({ icon, Title }) => {
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
            {/* // <View style={styles.NameCnt}> */}
            <Image source={icon} style={styles.headerIcon} />
            <Text style={styles.headerTxt}>{Title}</Text>
            {/* // </View> */}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    NameCnt: {
        // height: 41,
        width: '100%',
        backgroundColor: COLORS.theme,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerIcon: {
        height: 18,
        width: 18,
        marginVertical: 12,
        tintColor: COLORS.white,
        marginLeft: 14,
        marginRight: 10
    },
    headerTxt: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: COLORS.white
    }
})


export const demoAttandence = [
    {
        id: 1,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 2,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 3,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 4,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 5,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 6,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 7,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 8,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 9,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 10,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 11,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 12,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 13,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 14,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 15,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 16,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 17,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'Surat'
    },
    {
        id: 18,
        date: '14/01/2022',
        time: '09:00 AM',
        location: 'russia'
    }
]

export const SettingData = [
    {
        id: 1,
        img: require('../Assets/imgs/key.png'),
        title: 'Change Password'
    },
    {
        id: 2,
        img: require('../Assets/imgs/user.png'),
        title: 'Change Profile Picture'
    },
]

export const LogoutData = [
    {
        id: 1,
        img: require('../Assets/imgs/power-off.png'),
        title: 'Log out'
    },

]

export const LeaveData = [
    {
        id: 1,
        img: require('../Assets/imgs/key.png'),
        title: 'Casual Leave'
    },
    {
        id: 2,
        img: require('../Assets/imgs/reset.png'),
        title: 'Medical Leave'
    },
    {
        id: 3,
        img: require('../Assets/imgs/power-off.png'),
        title: 'Earned Leave'
    }
]


export const MenuData = [
    {
        id: 1,
        img: require('../Assets/imgs/user.png'),
        title: "Mark Attendence"
    },
    {
        id: 2,
        img: require('../Assets/imgs/user.png'),
        title: "Apply Leave"
    },
    {
        id: 3,
        img: require('../Assets/imgs/pie-chart.png'),
        title: "Payslip"
    },
    {
        id: 4,
        img: require('../Assets/imgs/pie-chart.png'),
        title: "Increment Letter"
    },
    {
        id: 5,
        img: require('../Assets/imgs/user.png'),
        title: "Leave Report"
    },
    {
        id: 6,
        img: require('../Assets/imgs/user.png'),
        title: "Attendence Report"
    },
]