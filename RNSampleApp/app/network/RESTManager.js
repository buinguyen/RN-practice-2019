import React from 'react'
import { AppServer } from '../common/Constants'
import { Base64 } from 'js-base64';

export default class RESTManager {

    static ip_address = AppServer.SERVER_HTTP_URL
    static port = AppServer.SERVER_PORT

    static restManager = null

    static getInstance() {
        if (restManager == null) {
            return new RESTManager()
        }
        return restManager
    }

    static getHost() {
        return (AppServer.SERVER_HTTP + this.ip_address + ":" + this.port).replace(/ /g,'')
    }

    static authenticate(username, password, authenticateCallback, isShowLoading) {
        //TODO: Show loading dialog
        if (isShowLoading) {

        }

        let authorization = 'Basic ' + Base64.encode(username + ':' + password)
        let baseUrl = this.getHost() + AppServer.API_AUTHENTICATE
        fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'authorization': authorization,
            }
        })
        .then((response) => {
            console.log(response)
            //TODO: Handle error from server
            return response.json()
        })
        .then((responseJson) => {
            console.log(responseJson)
            authenticateCallback(responseJson)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    static getDevicesInfo(deviceids, callback) {
        deviceids.forEach(async (element) => {
            let baseUrl = this.getHost() + AppServer.API_DEVICES_BY_ID + element
            try {
                let response = await fetch(baseUrl)
                if (response === undefined || response.status === 501) {
                    console.log('Get device ' + element.id + ' failed')
                    callback(undefined)
                } else {
                    let responseJson = await response.json()
                    if (responseJson !== undefined && responseJson.id !== undefined) {
                        callback(responseJson)
                    }
                }
            } catch(err) {
                console.error(err)
            }
        })
    }
}