import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../Assets/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

const Login = ({ navigation }) => {


    const [userLoginData, setUserLoginData] = useState({
        username: '',
        password: ''
    })
    const [load, setLoader] = useState(false);

    const storeData = async () => {

        if (userLoginData.username === '') return alert("please enter the username");
        if (userLoginData.password === '') return alert("Please enter the password");

        setLoader(true);
        try {
            console.log("userLoginData", userLoginData.username, userLoginData.password);
            console.log("url", `${API_URL}login/`);
            // const { result } = await axios.post(`${API_URL}/api/login/`, userLoginData);
            const { data: result } = await axios.post(`${API_URL}login/`, userLoginData);
            console.log("result", result);
            await AsyncStorage.setItem('refresh', result.refresh);
            await AsyncStorage.setItem('accessToken', result.access);
            await AsyncStorage.setItem('permissions', JSON.stringify(result.permissions));
            await AsyncStorage.setItem('username', result.username);

            if (result) {
                const config = {
                    method: 'get',
                    url: `${API_URL}user/?username=${userLoginData.username}`,
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json",
                        "Authorization": "Bearer " + (await AsyncStorage.getItem('accessToken')),
                    },
                };
                // const { data: result } = await axios.post(`${API_URL}user/?username=${userLoginData.username}`);
                const { data: result } = await axios(config)
                console.log("user", result);
                await AsyncStorage.setItem("userData", JSON.stringify(result.results[0]));
            }

            setLoader(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'HomeScreen' },
                    ],
                })
            );

            // setTimeout(() => {
            //     setLoader(false);
            //     navigation.dispatch(
            //         CommonActions.reset({
            //             index: 0,
            //             routes: [
            //                 { name: 'HomeScreen' },
            //             ],
            //         })
            //     );
            // }, 2500);

        } catch (error) {
            console.log(error);
            // saving error
            throw error;
            setLoader(false);
        }
    }

    const getData = async () => {
        try {
            console.log("UserLogin data", userLoginData);
            console.log("url", `${API_URL}login/`);
            // console.log("API URL", `${API_URL}/api/login/`);
            // const { data } = await axios.post(`${API_URL}/api/login/`, { username: "er.vishal85@gmail.com", password: "Sowmya@6" });
            // await AsyncStorage.setItem('refresh', data.refresh);
            // await AsyncStorage.setItem('access', data.access);
            // await AsyncStorage.setItem('permissions', JSON.stringify(data.permissions));
            // await AsyncStorage.setItem('username', data.username);

            // setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    // const onChange = (event) => {
    //     console.log("text", event);
    //     // setData({ ...data, email: text })
    // }

    // useEffect(() => {
    //     getData();
    // }, [data])

    return (
        <View style={styles.Cnt}>
            <View style={{  height: 250 }}>
                <Image source={require('../../../Assets/imgs/logo.png')} />
            </View>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Sigma Staffing Solutions Private Limited</Text>
            <View style={{}}>
                <TextInput
                    placeholder='Enter Employee Code'
                    secureTextEntry={false}
                    style={styles.resetInput}
                    placeholderTextColor={COLORS.inputFontGrey}
                    onChangeText={(text) => setUserLoginData({ ...userLoginData, username: text })}
                />
            </View>
            <View style={{}}>
                <TextInput
                    placeholder='Enter Password'
                    secureTextEntry={true}
                    style={styles.resetInput}
                    placeholderTextColor={COLORS.inputFontGrey}
                    onChangeText={(text) => setUserLoginData({ ...userLoginData, password: text })}
                />
            </View>


            {/* <TouchableOpacity style={styles.loginButton} onPress={() => getData()}>
                {
                    load ?
                        <ActivityIndicator size={'small'} color={COLORS.white} />
                        :
                        <Text style={{ color: COLORS.white, fontFamily: 'Roboto-Bold' }}>Get Data</Text>
                }
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.loginButton} onPress={() => storeData()}>
                {
                    load ?
                        <ActivityIndicator size={'small'} color={COLORS.white} />
                        :
                        <Text style={{ color: COLORS.white, fontFamily: 'Roboto-Bold' }}>LOGIN</Text>
                }
            </TouchableOpacity>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    Cnt: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resetInput: {
        // borderWidth: 1,
        // borderRadius: 10,
        borderBottomWidth: 1,
        width: 250,
        marginTop: 20,
        borderColor: COLORS.grey,
        // paddingHorizontal: 15,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: COLORS.inputFontGrey,
    },
    loginButton: {
        marginTop: 40,
        borderWidth: 1,
        paddingVertical: 10,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: COLORS.grey,
        backgroundColor: COLORS.theme
    }
})