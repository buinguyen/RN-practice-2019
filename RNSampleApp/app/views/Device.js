import React, {Component} from 'react'
import {
    StyleSheet, View, Button, Text, Image, Alert, FlatList, ActivityIndicator,
    TouchableHighlight, TouchableNativeFeedback
} from 'react-native'
import Styles from '../common/Styles'
import {AppStrings} from '../common/Constants'
import LogUtil from '../common/LogUtil'
import RESTManager from '../network/RESTManager';

var img_logo_item = require('../../resource/drawable/ic_logo_item.png')
var img_ic_menu = require('../../resource/drawable/ic_menu.png')
var countingRequest = 0
var devices = []
var deviceids = []

export default class Device extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowProgressBar: true,
            devices: []
        }

        // Get data passed from login screen
        try {
            const {state} = this.props.navigation
            data = state.params.data
            deviceids = data.deviceids
        } catch (err) {
            console.error('data is null')
        }

        countingRequest = 0
        devices = []

        // Get device id list from server
        this.getDevices()
    }

    getDevices = () => {
        RESTManager.getDevicesInfo(deviceids, this.onGetDevicesResult)
    }

    onGetDevicesResult = (device) => {
        countingRequest++
        if (device === undefined) {
            return
        }
        devices.push(device)

        if (countingRequest === deviceids.length) {
            devices.sort(this.compare)

            this.setState({
                isShowProgressBar: false,
                devices: devices
            })
        }
    }

    compare = (device1, device2) => {
        if (device1.id < device2.id) {
            return -1
        }
        if (device1.id > device2.id) {
            return 1
        }
        return 0
    }

    onPressItem = (item) => {
        console.log('Go to Status screen')
        this.props.navigation.navigate('StatusScreen', {device: item})
    }

    keyExtractor = (item, index) => item.id

    render = () => {
        if (this.state.isShowProgressBar) {
            return (
                <View style={Styles.activity_indicator}>
                    <ActivityIndicator size='large' color='#0000FF'/>
                </View>
            )
        } else {
            return (
                <View style={Styles.device_parent}>
                    <FlatList
                        data={this.state.devices}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({item}) => this.renderItem(item)}
                        ItemSeparatorComponent={() => <View style={{height: 8}}/>}
                        keyExtractor={this.keyExtractor}>
                    </FlatList>
                </View>
            )
        }
    }

    renderItem = (item) => {
        return (
            <TouchableNativeFeedback onPress={() => {
                this.onPressItem(item)
            }}>
                <View style={Styles.device_list_item_parent}>
                    <Image style={Styles.device_list_item_image1} source={img_logo_item}/>
                    <View style={Styles.login_list_item_title}>
                        <Text style={Styles.device_list_item_title_text}>{item.name}</Text>
                    </View>
                    <View style={Styles.device_list_item_image2_parent}>
                        <Image style={Styles.device_list_item_image2} source={img_ic_menu}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}
