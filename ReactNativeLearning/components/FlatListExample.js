import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Dimensions, TextInput,
    TouchableOpacity } from 'react-native';
import {fakeArray} from "./fackeData";

class MyListItem extends React.Component {
    _onPress = () => {
        alert(`Click: ${this.props.name}`)
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
            <View style={{backgroundColor: this.props.backgroundColor, flex: 1, flexDirection: 'column'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black',
                    marginHorizontal: 10, marginTop: 10}}>{this.props.name}
                </Text>
                <Text style={{fontSize: 14, color: 'black',
                    marginHorizontal: 10, marginVertical: 10}}>{this.props.location}
                </Text>
            </View>
            </TouchableOpacity>
        )
    }
}

export default class FlatListExample extends React.Component {
    render() {
        return (<View style={{flex: 1}}>
            <FlatList
                style={{flex: 1}}
                data={fakeArray}
                renderItem={({item, index}) => {
                    return (
                        <MyListItem id={item.id}
                                    name={item.name}
                                    location={item.location}
                                    backgroundColor={index % 2 == 0 ? 'skyblue':'powderblue'}
                        />
                    )
                }}
                keyExtractor={(item, index) => `${item.id}`}
                ItemSeparatorComponent={()=> {
                    return <View style={{height: 1, backgroundColor: 'steelblue'}}/>
                }}
            />
        </View>)
    }
}