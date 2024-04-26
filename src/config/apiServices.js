import axios from "axios";
import { API_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { CommonActions, useNavigation } from '@react-navigation/native';

export const httpGet = async (url) => {
    // const navigation = useNavigation();

    // try {
    // console.log(API_URL + url);
    const { data: result } = await axios.get(API_URL + url, {
        headers: {
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + (await AsyncStorage.getItem('accessToken')),
        },
    })
    return result;
    // }
    // catch (err) {
    //     console.error(err);
    // }
    // console.log("hello from api", result);


};


export const httpPost = async (url, body) => {

    // console.log(await AsyncStorage.getItem('accessToken'));
    const { data: result } = await axios.post(API_URL + url, body, {
        headers: {
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + (await AsyncStorage.getItem('accessToken')),
        },
    })
    // console.log(data);

    return result;
};
export const httpPostDocs = async (url, body) => {
    const { data: result } = await axios.post(API_URL + url, body, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + (await AsyncStorage.getItem('accessToken')),
        },
    })

    return result;

};

export const httpDelete = async (url) => {
    const { data: result } = await axios.delete(API_URL + url, {
        headers: {
            "Authorization": "Bearer " + (await AsyncStorage.getItem('accessToken')),
            // 'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
        },
    }).catch(err => {
        console.error(err);
    });

    return result;
};

export const httpPut = async (url, body) => {
    const { data: result } = await axios
        .put(API_URL + url, body, {
            headers: {
                "Authorization": "Bearer " + (await AsyncStorage.getItem('accessToken')),
                // 'Accept-encoding': 'gzip, deflate',
            },
        })
        .catch(err => {
            console.error(err);
        });

    return result;
};