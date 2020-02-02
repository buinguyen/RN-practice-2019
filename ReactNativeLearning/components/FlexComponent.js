import React from 'react';

import {
    Text, View, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity
} from 'react-native';

const profileImage = require('../images/electus.jpg');

export default class FlexComponent extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.profileImage} source={profileImage}/>
                </View>
                <View style={styles.midContainer}></View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: 'green'}}>
                        <Text style={styles.buttonTitle}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, backgroundColor: 'red'}}>
                        <Text style={styles.buttonTitle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    midContainer: {
        flex: 1,
    },
    bottomContainer: {
        flexDirection: 'row',
        height: 50
    },
    buttonTitle: {
        textAlign: 'center',
        fontSize: 16,
        padding: 12,
        color: 'white'
    },
    profileImage: {
        width: 160,
        height: 160,
        borderRadius: 80
    }
})

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topContainer: {
        backgroundColor: 'powderblue',
        flex: 1,
    },
    midContainer: {
        backgroundColor: 'skyblue',
        flex: 1,
    },
    bottomContainer: {
        backgroundColor: 'steelblue',
        flex: 1
    }
})