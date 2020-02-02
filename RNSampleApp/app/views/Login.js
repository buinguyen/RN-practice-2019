import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TextInput, Alert,
    ActivityIndicator } from 'react-native'
import Styles from '../common/Styles'
import { AppStrings, AppColors, AppFontSizes, AppServer } from '../common/Constants'
import LogUtil from '../common/LogUtil'
import RESTManager from '../network/RESTManager';

const TAG = 'Login'
var img_login_logo = require('../../resource/drawable/ic_logo_item.png')

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isShowProgressBar: false
        }
    }

    signin = () => {
        this.setState({
            username: 'A',
            password: '1',
            token: '',
            deviceids: undefined,
            isShowProgressBar: false
        })

        // TODO: Show progress bar
        this.setState({isShowProgressBar: true})
        
        RESTManager.authenticate(this.state.username, this.state.password, this.onSigninResult, true)

    }

    onSigninResult = (customerInfo) => {
        // TODO: Hide progress bar
        this.setState({isShowProgressBar: false})

        // Handle error when parse data
        if (customerInfo === undefined || !customerInfo.token) {
            Alert.alert('Login failed. Please check username and password again.')
            LogUtil.log(TAG, 'CustomerInfo is undefined')
            return
        }

        // Update state
        this.setState({
            token: customerInfo.token,
            deviceids: customerInfo.deviceids,
            isShowProgressBar: false
        })

        // Transit to device screen
        this.props.navigation.navigate('DeviceScreen', {data: this.state})
    }

    render() {
        if (this.state.isShowProgressBar) {
            return (
                <View style={Styles.activity_indicator}>
                    <ActivityIndicator size='large' color='#0000FF'/>
                </View>
            )
        } else {
            return (
                <View style={Styles.login_parent}>
                    <View style={Styles.login_logo_layout}>
                        <View style={{flex: 1}}/>
                        <View style={Styles.login_logo_view}>
                            <Image style={Styles.login_logo_image}
                                   source={img_login_logo}/>
                        </View>
                        <View style={{flex: 1}}/>
                    </View>
                    <View style={Styles.login_input_layout}>
                        <TextInput style={Styles.login_textinput} 
                            placeholder={AppStrings.login_edittext_user_hint}
                            placeholderTextColor={AppColors.gray}
                            onChangeText={(text) => {this.setState({username: text})}}
                            value={this.state.username}
                        />
                        <TextInput style={Styles.login_textinput} 
                            placeholder={AppStrings.login_edittext_password_hint} 
                            placeholderTextColor={AppColors.gray} secureTextEntry={true}
                            onChangeText={(text) => {this.setState({password: text})}}
                            value={this.state.password}
                        />
                    </View>
                    <View style={Styles.login_button_layout}>
                        <Button color = {AppColors.green}
                                onPress={() => this.signin()}
                                title={AppStrings.login_button_text}/>
                    </View>
                </View>
            )
        }
    }
}