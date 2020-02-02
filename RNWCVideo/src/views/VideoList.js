import React, { Component } from 'react'
import {
    Container, Button, Text, ListItem, List, Content, Body
}from 'native-base'
import {FlatList, TouchableOpacity, View, } from 'react-native'
import styles from '../styles/StyleVideoList'
import Network from '../controllers/network'
import {
    Links
} from '../common/Constants'
import HtmlParser from '../controllers/HtmlParser';
import Log from '../common/Log'

var tag = 'VideoList: '

class MyListItem extends React.Component {
    _onPress = () => {
        alert(`Click: ${this.props.id}`)
    }

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View >
                    <Text >{this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default class VideoList extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            links: [] 
        }
    }

    async componentWillMount() {
        // const savedProducts = await AsyncStorage.getItem('KEY_PRODUCTS')
        // if (savedProducts) {
        //     this.setState({products: JSON.parse(savedProducts)})
        // } else {
        //     this.setState({products: []})
        // }
    }

    _onStart() {
        Network.fetchUrl(Links.thethao247, this.onResponse.bind(this))
    }

    onResponse(html) {
        Log.log(tag, "--------------------------------------------------------------------------------------------------")
        links = HtmlParser.parseToLinks(html)
        this.setState({ links: links })
    }

    _handleLink = (link) => {
        this.props.navigation.navigate('VideoDetail', {
            link: link,
        })
    }

    toListItem = (item) => {
        return (
            <ListItem
                key={item.id}
                button onPress={this._handleLink.bind(this, item)}>
                    <Body>
                        <Text>{item.title}</Text>
                    </Body>
            </ListItem>
        )
    }

    render() {
        if (this.state.links.length > 0) {
            return (
                <Container style={styles.login_parent}>
                    <Button onPress={() => { this._onStart() }}>
                        <Text>Start</Text>
                    </Button>
                    <Content>
                        <List>
                            {this.state.links.map(this.toListItem)}
                        </List>
                    </Content>
                </Container>
            )
        } else {
            return (
                <Container style={styles.login_parent}>
                    <Button onPress={() => { this._onStart() }}>
                        <Text>Start</Text>
                    </Button>
                    <Text>No data</Text>
                </Container>
            )
        }
    }
}