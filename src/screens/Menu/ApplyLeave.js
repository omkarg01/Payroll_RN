import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, Pressable, ToastAndroid, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../../Assets/colors'
import * as Animatable from 'react-native-animatable';
import { Header, LeaveData, reUseComponent, SettingData } from '../../../Assets/ReUsableComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import Logout from '../setting/Logout';
import DateTimePicker from '@react-native-community/datetimepicker';
import { employeeURL, leaveURL, leavesPolicyURL } from '../../config/routesConstant';
import { httpGet, httpPost } from '../../config/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';

const ApplyLeave = ({ navigation, route }) => {
	const [date1, setDate1] = useState(new Date())
	const [date2, setDate2] = useState(new Date())

	const [showDatePickerFrom, setShowDatePickerFrom] = useState(false)
	const [showDatePickerTo, setShowDatePickerTo] = useState(false)

	const [fromDate, setFromDate] = useState('')
	const [toDate, setToDate] = useState('')

	const [number_of_days, setNumber_of_days] = useState("")
	const [reason, setReason] = useState("")

	const [benefits, setBenefits] = useState([])
	const [selectedBenefit, setSelectedBenefit] = useState()


	// dropdown
	// const [open, setOpen] = useState(false);
	// const [value, setValue] = useState(null);
	// const [items, setItems] = useState([
	// 	{ label: 'Apple', value: 'apple' },
	// 	{ label: 'Banana', value: 'banana' }
	// ]);

	useEffect(() => {
		getAllDropdown()
		// console.log(value);
	}, []);

	useEffect(()=>{
		calculateDateDiff()
	}, [toDate])

	// const onSelectItemClick = (item) => {
	// 	console.log(item);
	// }


	const getAllDropdown = async () => {
		try {
			const result = await httpGet(leavesPolicyURL);
			console.log("result", result);
			setBenefits(result.results);


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
			// console.log("hello", error);
			throw err;
		}
	}

	const toggleDatePicker = (type) => {
		if (type === 1) {
			setShowDatePickerFrom(!showDatePickerFrom);
		} else {
			setShowDatePickerTo(!showDatePickerTo);
		}
	}

	const onChangeFrom = ({ type }, selectedDate) => {
		if (type === "set") {
			const currentDate = selectedDate;
			console.log(currentDate.getDay());
			if (currentDate.getDay() === 0) {
				toggleDatePicker(1);
				alert("You can't select Sunday");
				return;
			}
			console.log(selectedDate);
			// console.log("currentDate", currentDate.toISOString().split('T')[0]);
			setDate1(currentDate);

			if (Platform.OS === 'android') {
				toggleDatePicker(1);
				setFromDate(currentDate.toISOString().split('T')[0]);
				// console.log("fromDate", fromDate);
				// calculateDateDiff()
			}
		} else {
			toggleDatePicker(1);
		}
	}

	const onChangeTo = ({ type }, selectedDate) => {
		if (type === "set") {
			const currentDate = selectedDate;
			if (currentDate.getDay() === 0) {
				toggleDatePicker(2);
				alert("You can't select Sunday");
				return;
			}
			console.log(selectedDate);
			// console.log("currentDate", currentDate.toISOString().split('T')[0]);
			setDate2(currentDate);

			if (Platform.OS === 'android') {
				toggleDatePicker(2);
				setToDate(currentDate.toISOString().split('T')[0]);
				// console.log("fromDate", fromDate);
				// calculateDateDiff()
			}
		} else {
			toggleDatePicker(2);
		}
	}

	const calculateDateDiff = () => {
		// console.log(toDate);
		// if (fromDate && toDate) {
			let from = new Date(fromDate);
			let to = new Date(toDate);
			let count = 0;
			console.log("DIFF", from, to);

			// let nod = (((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)) + 1).toString();
			// console.log(nod);

			while (from <= to) {
				if (from.getDay() !== 0) {
					// Exclude Sundays (0 represents Sunday)
					count++;
				}
				from.setDate(from.getDate() + 1); // Move to the next day
			}
			console.log("count", count);
			setNumber_of_days(count.toString())
		// }
	}

	const onSubmit = async () => {

		let userData = JSON.parse(await AsyncStorage.getItem('userData'));
		// console.log(userData);
		let permission = JSON.parse(await AsyncStorage.getItem('permissions'));
		let nod = ((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)).toString();
		try {
			let body = {
				"From": fromDate,
				"to": toDate,
				"number_of_days": number_of_days,
				"reason": reason,
				"employee_id": userData.id,
				"leave_benefit": 1,
				// "leave_benefit": selectedBenefit,
				"approved_by_manager": 1,
				"status": 2
			}
			console.log(body);
			// const result = await httpPost(leaveURL, body)

			setNumber_of_days("")
			setReason("")
			setFromDate("")
			setToDate("")
			setDate1(new Date())
			setDate2(new Date())
			setSelectedBenefit("")
			// console.log("result", result);
			applyLeave()
		} catch (err) {
			// setNumber_of_days("")
			// setReason("")
			// setFromDate("")
			// setToDate("")
			// setDate1(new Date())
			// setDate2(new Date())
			if (err) {
				console.error(err);
				// throw err;
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

			// console.log("hello", error);
			throw err;
		}
	}



	const applyLeave = () => {
	

		Alert.alert('Mark Attendance', 'Leave applied successfully!', [
			{
				text: 'OK', onPress: () => navigation.dispatch(CommonActions.goBack()),
			},
		]);
	};


	return (
		<Animatable.View
			animation={reUseComponent.commonAnimation}
			style={styles.mainCnt}
		>
			<View style={styles.dataCnt}>
				{LeaveData.map((item, index) => {
					return (
						<View style={styles.btn} >
							<Text style={styles.textCount}>12</Text>
							{/* <Image source={item.img} style={styles.btnImg} /> */}
							<Text style={styles.btnTxt}>
								{item.title}
							</Text>
						</View>
					)
				})}
			</View>


			<View style={styles.resetPasswordCnt}>
				{/* HEADER */}
				{/* <View style={styles.NameCnt}> */}
				<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.NameCnt} colors={[COLORS.primary, COLORS.secondary]} >
					<Text style={styles.headerTxt}>{"Fill the Leave Form"}</Text>
				</LinearGradient>
				{/* </View> */}
				{/* CHANGE PASSWORD DESIGN */}
				<View style={{ paddingHorizontal: 15 }}>


					{/* <View style={{ marginTop: 10 }}>
						<Text style={styles.inputText}>Leaves Benefit</Text>
						<DropDownPicker
							placeholder={selectedBenefit}
							onSelectItem={item => setSelectedBenefit(item.id)}
							open={open}
							value={benefits.map(item => ({ ...item, value: item.id }))}
							items={benefits.map(item => ({ ...item, label: item.benefit_desc }))}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							style={{ borderColor: COLORS.grey }}
						/>
					</View> */}

					<View style={{ marginTop: 15 }}>
						<Text style={styles.inputText}>From Date</Text>
						{showDatePickerFrom && <DateTimePicker mode="date" onChange={onChangeFrom} value={date1} />}
						{!showDatePickerFrom && <Pressable onPress={() => toggleDatePicker(1)}>
							<TextInput
								placeholder='Select From Date'
								// secureTextEntry={true}
								style={styles.resetInput}
								placeholderTextColor={COLORS.inputFontGrey}
								onChangeText={setFromDate}
								editable={false}
								value={fromDate}
							/>
						</Pressable>}
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={styles.inputText}>To Date</Text>
						{showDatePickerTo && <DateTimePicker mode="date" onChange={onChangeTo} value={date2} />}
						{!showDatePickerTo && <Pressable onPress={() => toggleDatePicker(2)}>
							<TextInput
								placeholder='Select To Date'
								// secureTextEntry={true}
								style={styles.resetInput}
								placeholderTextColor={COLORS.inputFontGrey}
								onChangeText={setToDate}
								editable={false}
								value={toDate}
							/>
						</Pressable>}
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={styles.inputText}>No. of days</Text>
						<TextInput
							placeholder=''
							// secureTextEntry={true}
							style={[styles.resetInput, { backgroundColor: COLORS.grey }]}
							placeholderTextColor={COLORS.inputFontGrey}
							editable={false}
							selectTextOnFocus={false}
						value={number_of_days}
						// value={toDate && fromDate ? ((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)).toString() : number_of_days}
						// disabled={true}
						// style={{ alignSelf: 'center', width: 200, marginTop: 50, backgroundColor: 'grey' }}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={styles.inputText}>Reason</Text>
						<TextInput
							placeholder='Reason'
							// secureTextEntry={true}
							style={styles.resetInput}
							onChangeText={text => setReason(text)}
							placeholderTextColor={COLORS.inputFontGrey}
							value={reason}
						/>
					</View>
					{/* )
					})} */}
					<TouchableOpacity onPress={onSubmit}>
						<View style={styles.resetPswCnt}  >
							<Text style={styles.submitBtn}>SUBMIT</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</Animatable.View >
	)
}

export default ApplyLeave;

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
		// flex: 1,
		// borderWidth: 2,
		textAlign: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		marginBottom: 20,

	},
	textCount: {
		color: COLORS.black,
		fontSize: 20,
		fontFamily: 'Roboto-Medium'
	},
	btn: {
		borderRadius: 7,
		borderWidth: 2,
		borderColor: COLORS.theme,
		height: 80,
		width: 100,
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
		// flexDirection: 'row',
		// alignItems: 'center',
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
		textAlign: "center",
		paddingVertical: 10
	},
	modalView: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	resetPasswordCnt: {
		// borderWidth: 3,
		alignSelf: 'center',
		flex: 1,
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
		color: COLORS.black
	},
	eyeBtnCnt: {
		position: 'absolute',
		alignSelf: 'flex-end'
	},
	resetPswCnt: {
		// marginHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 25,
		paddingVertical: 10,
		backgroundColor: COLORS.btn,
		borderRadius: 10
	},
	btnTxt: {
		fontSize: 15,
		color: COLORS.theme,
		paddingHorizontal: 10,
		textAlign: 'center',
	},
	inputText: {
		fontSize: 17,
		color: COLORS.theme,
		paddingHorizontal: 10,
		paddingBottom: 5,
		// textAlign: 'center',
	},
	submitBtn: {
		fontSize: 15,
		color: COLORS.white,
		// paddingHorizontal: 10,
		textAlign: 'center',
	},
	logoutTxt: {
		marginTop: 15,
		marginBottom: 9,
		fontFamily: 'Roboto-Medium',
		fontSize: 18,
		color: 'black'
	}
})