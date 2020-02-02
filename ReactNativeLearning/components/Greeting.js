import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Hello} from "./Hello";

export default class Greetings extends Component {
    render() {
        return (<View>
            <Hello name='Nguyen' dateOfBirth='09/10/1992'/>
            <Hello name='Name' dateOfBirth={'09/10/1993'}/>
        </View>)
    }
}