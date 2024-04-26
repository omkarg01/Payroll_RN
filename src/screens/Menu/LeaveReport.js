import { View, Text, StyleSheet, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../../../Assets/colors';
import { demoAttandence, Header, reUseComponent } from '../../../Assets/ReUsableComponent';
import { attendanceURL, leaveURL } from '../../config/routesConstant';
import { httpGet } from '../../config/apiServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const LeaveReport = () => {
	const [leave, setLeave] = useState([])

	// let userData = null;

	const getLeaves = async () => {
		try {
			// userData = JSON.parse(await AsyncStorage.getItem('userData'));
			// console.log("userData", userData);
			console.log(leaveURL);
			const result = await httpGet(leaveURL + "?page_size=200");
			console.log("attendance", result);
			setLeave(result.results);

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
		getLeaves()
	}, [])

	return (
		<Animatable.View
			animation={reUseComponent.commonAnimation}
			style={styles.mainCnt}
		>
			{/* <Header Title={'Apply Leaves'} icon={require('../../../Assets/imgs/pie-chart.png')} /> */}
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
				{/* <View style={[styles.dateInfoCnt]}> */}
				{[1, 2, 3].map((item) => {
					return (
						<Text style={styles.txt}>{
							item === 1 ?
								"From"
								:
								item === 2 ?
									"To"
									:
									item === 3 ?
										"Reason"
										:
										null
						}</Text>
					)
				})}
				{/* </View> */}
			</LinearGradient>


			<View style={{ flex: 1 }}>
				<FlatList data={leave}
					renderItem={({ item, index }) => (<>
						<View style={[styles.dateInfoCnt, { marginTop: 10 }]}>
							<Text style={styles.infoTxt}>{item.From}</Text>
							<View style={{ flex: 0.72 }}>
								<Text style={styles.infoTxt}>{item.to}</Text>
							</View>
							<View style={{ flexDirection: "row" }}>
								<Text style={styles.infoTxt}>{item.reason}</Text>
								<View style={{ width: 20, height: 20, backgroundColor: index % 4 !== 0 ? "#66ff66" : "#ff4d4d", marginLeft: 5, borderRadius: 2 }}></View>
							</View>
						</View>
						<View style={{ height: '0.2%', backgroundColor: '#C4C4C4', marginHorizontal: 10 }} />
					</>)}
				>

				</FlatList>
			</View>
			{/* <View style={{ flex: 1 }}>
				<FlatList data={leave}>
					{leave.map((item, index) => {
						return (
							<>
								<View style={[styles.dateInfoCnt, { marginTop: 10 }]}>
									<Text style={styles.infoTxt}>{item.From}</Text>
									<View style={{ flex: 0.72 }}>
										<Text style={styles.infoTxt}>{item.to}</Text>
									</View>
									<View style={{ flexDirection: "row" }}>
										<Text style={styles.infoTxt}>{item.reason}</Text>
										<View style={{ width: 20, height: 20, backgroundColor: index % 4 !== 0 ? "#66ff66" : "#ff4d4d", marginLeft: 5, borderRadius: 2 }}></View>
									</View>
								</View>
								<View style={{ height: '0.2%', backgroundColor: '#C4C4C4', marginHorizontal: 10 }} />
							</>
						)
					})}
					<View style={{ height: 40 }} />
				</FlatList>
			</View> */}
		</Animatable.View>
	)
}

export default LeaveReport;

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
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
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
		// paddingHorizontal: 18,
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
		color: COLORS.black,
		fontSize: 16,
		// marginBottom: 11
	}
})