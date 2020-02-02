import React, {Component} from 'react'
import {Container, Content, Item, Input, Text, Button} from 'native-base'
import {StyleSheet} from 'react-native'

export default class DetailProduct extends Component{
    static navigationOptions = {
        headerTitle: 'Chi tiet san pham',
        headerStyle: {
            backgroundColor: 'rgb(223, 63, 72)'
        },
        headerTintColor: 'white'
    }
    constructor(props) {
        super(props)
        this.state = {
            product: this.props.navigation.state.params.product,
        }
    }

    render() {
        const {updateProduct} = this.props.navigation.state.params
        return(
            <Container style={styles.container}>
                <Content>
                    <Item style={styles.itemInput}>
                        <Input
                            placeholder = "Ten san pham"
                            onChangeText = {text => {
                                let updateProduct = this.state.product
                                updateProduct.name = text
                                this.setState({product: updateProduct})
                            }}
                            value={this.state.product.name}
                            style={styles.input}
                        />
                    </Item>
                    <Item style={styles.itemInput}>
                        <Input
                            placeholder = "Gia san pham"
                            onChangeText = {text => {
                                let updateProduct = this.state.product
                                updateProduct.price = text
                                this.setState({product: updateProduct})
                            }}
                            value={this.state.product.price}
                            style={styles.input}
                        />
                    </Item>
                    <Button
                        block
                        style={styles.button}
                        onPress={() => {
                            updateProduct(this.state.product)
                            this.props.navigation.goBack()
                        }}
                    >
                        <Text>Luu san pham</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(210, 230, 239)'
    },
    input: {
        marginHorizontal: 10,
        paddingLeft: 10,
        borderColor: 'rgb(100, 121, 133)',
        borderWidth: 1
    },
    itemInput: {
        marginTop: 10
    },
    button: {
        backgroundColor: 'rgb(16, 33, 48)',
        marginHorizontal: 10,
        marginTop: 20
    }
})