import React, {Component} from 'react'
import {View, Button, Text, TextInput, Alert, Keyboard} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {AppStrings, AppColors, AppServer} from '../common/Constants';
import Styles from '../common/Styles';
import RESTManager from '../network/RESTManager';

export default class Splash extends Component {

    constructor(props) {
        super(props)
    }

    navigateToLoginScreen() {
        console.log('Go to Login screen')
        this.props.navigation.navigate('LoginScreen');
    }

    navigateToStatusScreen() {
        console.log('Go to Status screen')
        this.props.navigation.navigate('StatusScreen');
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', padding: 16}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
                    <TextInput
                        style={Styles.login_textinput}
                        placeholder={AppStrings.server_ip}
                        placeholderTextColor={AppColors.gray}
                        onChangeText={(text) => {
                            RESTManager.ip_address = text
                        }}/>
                    <Button
                        onPress={() => {
                            this.navigateToLoginScreen()
                            Keyboard.dismiss
                        }}
                        title={AppStrings.save_ip}
                    />
                    <Button
                        onPress={() => {
                            this.navigateToStatusScreen()
                            Keyboard.dismiss
                        }}
                        title={AppStrings.go_to_status}
                    />
                </View>
            </View>
        )
    }
}