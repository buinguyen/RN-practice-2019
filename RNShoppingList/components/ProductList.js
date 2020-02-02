import React, {Component} from 'react'
import {
    Body, Container, Content, Right, Text, CheckBox, List, ListItem, Fab, Icon
} from 'native-base'
import {YellowBox , StyleSheet, Alert, AsyncStorage} from 'react-native'

import NewProductModal from "./NewProductModal";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class ProductList extends Component {
    static navigationOptions = {
        title: 'Danh sach san pham',
        headerStyle: {
            backgroundColor: 'rgb(223, 63, 72)'
        },
        headerTintColor: 'white'
    }
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    async componentWillMount() {
        const savedProducts = await AsyncStorage.getItem('KEY_PRODUCTS')
        if (savedProducts) {
            this.setState({products: JSON.parse(savedProducts)})
        } else {
            this.setState({products: []})
        }
    }

    convertProductToListItem = (product) => {
        return (
            <ListItem
                key={product.id}
                button onPress={this._handleDetailProduct.bind(this, product)}
            >
                <Body>
                    <Text style={styles.nameText}>{product.name}</Text>
                    <Text style={styles.priceText}>{product.price}</Text>
                </Body>
                <Right>
                    <CheckBox
                        checked={product.checked}
                        onPress={this._handleCheckProduct.bind(this, product)}
                    />
                </Right>
            </ListItem>
        )
    }

    updateProduct = (updatedProduct) => {
        this.state.products.forEach(p => {
            if (updatedProduct.id === p.id) {
                p.name = updatedProduct.name
                p.price = updatedProduct.price
            }
            return p
        })
        this.setState({products: this.state.products})
        var json = JSON.stringify(this.state.products)
        AsyncStorage.setItem('KEY_PRODUCTS', json)
    }

    addNewProduct = (newProduct) => {
        var ps = this.state.products.concat(newProduct)
        this.setState({products: ps})
        var json = JSON.stringify(ps)
        AsyncStorage.setItem('KEY_PRODUCTS', json)
    }

    _handleCheckProduct = (product) => {
        this.state.products.forEach(p => {
            if (product.id === p.id) {
                p.checked = !p.checked
            }
            return p
        })
        this.setState({products: this.state.products})
        var json = JSON.stringify(this.state.products)
        AsyncStorage.setItem('KEY_PRODUCTS', json)
    }

    _handleDetailProduct = (product) => {
        this.props.navigation.navigate('DetailProduct', {
            product: product,
            updateProduct: this.updateProduct.bind(this)
        })
    }

    _handleAddProduct = () => {
        this.refs.newProductModal.showModal()
    }

    _handleDeleteProduct = () => {
        var deletingIds = []
        this.state.products.forEach((p) =>{
            if (p.checked === true) {
                deletingIds.push(p.id)
            }
        })
        if (deletingIds.length === 0) {
            alert('Ban phai chon it nhat mot san pham de xoa!')
            return
        }
        Alert.alert(`Ban muon xoa ${deletingIds.length} san pham?`, null, [
            {text: 'Khong'},
            {text: 'Co', onPress: () => {
                var newProducts = this.state.products.filter(p=>p.checked == false)
                this.setState({products: newProducts})
                var json = JSON.stringify(this.state.products)
                AsyncStorage.setItem('KEY_PRODUCTS', json)
            }}
        ])
    }

    render() {
        return (
            <Container style={{backgroundColor: 'rgb(210, 230, 239)'}}>
                <Content>
                    <List>
                        {this.state.products.map(this.convertProductToListItem)}
                    </List>
                </Content>
                <Fab
                    style={styles.fabIconAdd}
                    position={'bottomRight'}
                    onPress={this._handleAddProduct.bind(this)}
                >
                    <Icon name={"add"}/>
                </Fab>
                <Fab
                    style={styles.fabIconRemove}
                    position={'bottomLeft'}
                    onPress={this._handleDeleteProduct.bind(this)}
                >
                    <Icon name={"ios-remove"}/>
                </Fab>
                <NewProductModal
                    ref={"newProductModal"}
                    addNewProduct={this.addNewProduct}
                >
                </NewProductModal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    nameText: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    priceText: {
        marginHorizontal: 10,
        marginTop: 10,
        fontSize: 16
    },
    fabIconAdd: {
        backgroundColor: 'rgb(100, 121, 133)'
    },
    fabIconRemove: {
        backgroundColor: '#f31944'
    }
})