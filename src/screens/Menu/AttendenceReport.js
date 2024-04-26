import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../../Assets/colors';
import { demoAttandence, Header, reUseComponent } from '../../../Assets/ReUsableComponent';
import { attendanceURL } from '../../config/routesConstant';
import { httpGet } from '../../config/apiServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const AttendenceReport = () => {
    const [attendance, setAttendance] = useState([])

    let userData = null;

    const getAttendance = async () => {
        try {
            userData = JSON.parse(await AsyncStorage.getItem('userData'));
            console.log("userData", userData);
            console.log(attendanceURL + "?employee_id=" + userData.id);
            const result = await httpGet(attendanceURL + "?employee_id=" + 21 + "&?page_size=200");
            console.log("attendance", result);
            setAttendance(result.results);

            // console.log(month);
        } catch (err) {
            if (err) {
                console.error(err);
                throw err;
            }
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
        }
    }

    useEffect(() => {
        getAttendance()
    }, [])



    return (
        <Animatable.View
            animation={reUseComponent.commonAnimation}
            style={styles.mainCnt}
        >
            {/* <Header Title={'Attendance Report'} icon={require('../../../Assets/imgs/pie-chart.png')} /> */}
            {/* <View style={{
                // justifyContent: 'space-between',
                flexDirection: 'row',
                paddingVertical: 10,
                marginHorizontal: 18,
            }}>
                <View style={{ flexDirection: "row", marginRight: 30 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: '#66ff66', marginRight: 5, borderRadius: 2 }}></View>
                    <Text style={{ fontFamily: 'Roboto-Regular', color: COLORS.black, fontSize: 16 }}>Approved</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 20, height: 20, backgroundColor: '#ff4d4d', marginRight: 5, borderRadius: 2 }}></View>
                    <Text style={{ fontFamily: 'Roboto-Regular', color: COLORS.black, fontSize: 16 }}>Pending</Text>
                </View>
            </View> */}
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
                {/* <View style={[styles.dateInfoCnt, { marginTop: 16 }]}> */}
                {[1, 2, 3].map((item) => {
                    return (
                        <Text style={styles.txt}>{
                            item === 1 ?
                                "Punch Date"
                                :
                                item === 2 ?
                                    "Total Hours"
                                    :
                                    item === 3 ?
                                        "Status"
                                        :
                                        null
                        }</Text>
                    )
                })}
                {/* </View> */}
            </LinearGradient>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {attendance.map((item, index) => {
                        return (
                            <>
                                <View style={[styles.dateInfoCnt, { marginTop: 10, }]}>
                                    <Text style={styles.infoTxt}>{item.applied_date}</Text>
                                    <View style={{ flex: 0.12 }}>
                                        <Text style={styles.infoTxt}>{eval(item.total_hours)}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={styles.infoTxt}>{item._status}</Text>
                                        <View style={{ width: 20, height: 20, marginLeft: 5, backgroundColor: item.status === 1 ? "#66ff66" : "#ff4d4d", borderRadius: 2 }}></View>
                                    </View>
                                </View>
                                <View style={{ height: '0.6%', backgroundColor: '#C4C4C4', marginHorizontal: 10 }} />
                            </>
                        )
                    })}
                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </Animatable.View>
    )
}

export default AttendenceReport

const styles = StyleSheet.create({
    mainCnt: {
        elevation: 3,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
        width: '95%',
        flex: 0.98
        // height: '96%'
    },
    NameCnt: {
        // height: 41,
        color: COLORS.white,
		width: '100%',
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		paddingHorizontal: 13,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
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
    },
    dateInfoCnt: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 5,
        marginHorizontal: 10,
        // paddingHorizontal: 4,
        borderRadius: 5
    },
    txt: {
        fontFamily: 'Roboto-Bold',
        color: COLORS.white,
        fontSize: 16
    },
    infoTxt: {
        fontFamily: 'Roboto-Regular',
        color: '#777777',
        fontSize: 16,
        // marginBottom: 11
    }
})