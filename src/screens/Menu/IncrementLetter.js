import { View, Text, StyleSheet, ScrollView, Image, Button, PermissionsAndroid, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable';
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../Assets/colors'
import { CommonActions, Link, useNavigation } from '@react-navigation/native'
import { httpGet } from '../../config/apiServices'
import { employeeDocumentURl, monthsURL } from '../../config/routesConstant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Header, demoAttandence, reUseComponent } from '../../../Assets/ReUsableComponent';
import ReactNativeBlobUtil from 'react-native-blob-util'
import DocumentModal from '../../components/DocumentModal';
import LinearGradient from 'react-native-linear-gradient';

const IncrementLetter = () => {
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [docFileURL, setDocFileURL] = useState("");
    const [incrementLetter, setIncrementLetter] = useState([])
    const [month, setMonth] = useState([])

    const navigation = useNavigation();

    let userData = null;

    const getIncrementLetter = async () => {
        try {
            userData = JSON.parse(await AsyncStorage.getItem('userData'));
            // console.log("userData", JSON.parse(userData));
            const result = await httpGet(`${employeeDocumentURl}?employee_id=${21}&company_documents_id=3`);
            console.log("documents", result);
            setIncrementLetter(result.results);
            console.log(incrementLetter);

            const result1 = await httpGet(monthsURL);
            console.log("month", result1.results);
            setMonth(result1.results)

            // console.log(month);
        } catch (err) {
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

    const downloadFile = () => {

        // Get today's date to add the time suffix in filename
        let date = new Date();
        // File URL which we want to download
        let FILE_URL = "https://payroll-appserver.s3.amazonaws.com/static/bbb70d.jpg";
        // Function to get extention of the file url
        let file_ext = getFileExtention(FILE_URL);

        file_ext = '.' + file_ext[0];


        // config: To get response by passing the downloading related options
        // fs: Root directory path to download
        const { config, fs } = ReactNativeBlobUtil;
        let RootDir = fs.dirs.DownloadDir;
        console.log("path", RootDir +
            '/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext);
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir +
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: true,
                // useDownloadManager works with Android only
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL, {})
            .then(res => {
                // Alert after successful downloading
                console.log('res -> ', JSON.stringify(res));
                alert('File Downloaded Successfully.');
            }).catch((e) => {
                console.error(e)
            });;
    };

    const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };


    // Function to check the platform
    // If Platform is Android then check for permissions.
    const checkPermission = async () => {

        if (Platform.OS === 'ios') {
            downloadFile();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to download File',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Start downloading
                    downloadFile();
                    console.log('Storage Permission Granted.');
                } else {
                    // If permission denied then show alert
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log("++++" + err);
            }
        }
    };

    const onView = (url) => {
        setShowDocumentModal(true);
        setDocFileURL(url);
    }


    useEffect(() => {
        getIncrementLetter();
        // console.log("month", month[userData.id - 1]);
    }, [])


    return (
        <Animatable.View
            animation={reUseComponent.commonAnimation}
            style={styles.mainCnt}
        >
            {/* <Button title='Back'>Back</Button> */}
            {/* <Header Title={'Increment Letter'} icon={require('../../../Assets/imgs/pie-chart.png')} /> */}
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.NameCnt]} colors={[COLORS.primary, COLORS.secondary]} >
                {/* <View style={[styles.dateInfoCnt, { marginTop: 16 }]}> */}
                {[1, 2].map((item) => {
                    return (
                        <Text key={item} style={styles.txt}>{
                            item === 1 ?
                                "Month"
                                :
                                item === 2 ?
                                    "Download"
                                    :
                                    null
                        }</Text>
                    )
                })}
                {/* </View> */}
            </LinearGradient>
            <View style={{ height: '0.2%', backgroundColor: '#C4C4C4', marginHorizontal: 14 }} />

            <View style={{ flex: 1 }}>
                <ScrollView>
                    {incrementLetter.map((item, index) => {
                        return (
                            <>
                                <View key={item.id} style={[styles.dateInfoCnt, { marginTop: index === 0 ? 22 : 11 }]}>
                                    {month.length >= 1 && <Text style={[styles.infoTxt]}>{month[item.document_id - 1].desc}</Text>}
                                    {/* <Button color={COLORS.theme} title="Download" onPress={checkPermission} /> */}
                                    <Text style={{ width: 100, backgroundColor: COLORS.btn, height: 35, color: COLORS.white, borderRadius: 5, textAlign: 'center', textAlignVertical: 'center' }}
                                        onPress={() => onView("https://smartly.co.nz/content/dam/smartly/images/help-centre/run-a-pay/Payslip%204.png")}>View</Text>
                                    {/* onPress={() => onView(item.doc_file)}>View</Text> */}
                                </View>
                                <View style={{ height: '0.2%', backgroundColor: '#C4C4C4', marginHorizontal: 14 }} />
                            </>
                        )
                    })}
                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
            <DocumentModal showDocumentModal={showDocumentModal} headerTitle={"Increment Letter"} source={docFileURL} setShowDocumentModal={setShowDocumentModal} />
        </Animatable.View>
    )
}

export default IncrementLetter

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
        height: 41,
		width: '100%',
		backgroundColor: COLORS.theme,
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		paddingHorizontal: 13,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
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
        // paddingHorizontal: 14,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginVertical: 10
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
        width: 100,
        textAlign: "center",
        height: 35,
        textAlignVertical: 'center'
    },
    btn: {
        backgroundColor: "#777777",
        color: "#777777",
    }
})
