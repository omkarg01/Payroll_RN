import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../../Assets/colors'

const Button = (props) => {
    console.log(props);
    return (
        <View style={styles.dataCnt}>
            <TouchableOpacity style={styles.btn} onPress={() => { }}>
                <Image source={props.img} style={styles.btnImg} />
                <Text style={styles.btnText}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    dataCnt: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    btn: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.theme,
        height: 85,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    btnImg: {
        height: 30,
        width: 30
    },
    btnText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        color: COLORS.theme,
    }
})