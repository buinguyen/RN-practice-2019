import React from 'react';
import {View, Text, TextInput, Image, StyleSheet, KeyboardAvoidingView} from 'react-native';

export default class TextInputComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={email: ''}
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username/email"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    keyboardType="email-address"
                    autoCorrect={false}
                    value={this.state.email}
                    onChangeText={(text)=>{
                        this.setState({email: text})
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(32, 53, 70)'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)'
    }
})