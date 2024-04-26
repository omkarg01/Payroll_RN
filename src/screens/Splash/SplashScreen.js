import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const animation = {
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    }
}

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        checkValidUser()
    }, [])

    const checkValidUser = async () => {
        setTimeout(async () => {
            const value = await AsyncStorage.getItem('username')
            if (value) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'HomeScreen' },
                        ],
                    })
                );
            } else {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'LoginScreen' },
                        ],
                    })
                );
            }
        }, 3000);
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'rgba(249, 245, 245,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.View animation={animation} duration={3000}>
                <View style={{ height: 250 }}>
                    <Image source={require('../../../Assets/imgs/logo.png')} />
                </View>
            </Animatable.View>
            <Animatable.View animation={animation} duration={3000}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Sigma Staffing Solutions Private Limited</Text>
            </Animatable.View>
        </View>
    )
}

export default SplashScreen