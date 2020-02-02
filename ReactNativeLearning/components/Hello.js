import React, {Component} from "react";
import {View, Text} from 'react-native';

export class Hello extends Component {

    constructor(props) {
        super(props)
        this.state = {timer: 0};
        setInterval(() => {
            this.setState((previousState) => {
                return {timer: previousState.timer + 1}
            })
            console.log(`State moi la: ${this.state.timer}`)
        }, 1000);
    }

    render() {
        return (<View>
            <Text style={{marginTop: 40, fontSize: 16}}>
                Hello {this.props.name},
                Nam sinh: {this.props.dateOfBirth}
            </Text>
        </View>)
    }
}
