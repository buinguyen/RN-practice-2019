import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

// Cach 1: Dinh nghia React Native Component dang class

const uri = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/White-tailed_Tropicbird.jpg/220px-White-tailed_Tropicbird.jpg'

class StyledComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: uri}}></Image>
            </View>
        )
    }
}

// Cach 2: Dinh nghia React Native Component dang function
const StyledComponent2 = (props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: uri}}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'cyan',
        width: 200,
        height: 200,
        justifyContent: 'center'
    },
    image: {
        width:  100,
        height: 100,
        alignSelf: 'center'
    }
})

export {StyledComponent, StyledComponent2}
