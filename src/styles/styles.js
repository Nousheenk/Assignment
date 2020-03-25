import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    input: {
        width: wp('100%'),
        height: hp('100%'),
        alignItems: 'center'

    },
    inputview: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('80%'),
        marginBottom:hp('2%')
    }
})

