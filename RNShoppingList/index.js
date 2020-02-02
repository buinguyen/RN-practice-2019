import { AppRegistry } from 'react-native';
//import App from './App';
import {StackNavigator} from 'react-navigation'

import ProductList from './components/ProductList'
import DetailProduct from './components/DetailProduct'

const Navigator = StackNavigator ({
    ProductList: {screen: ProductList},
    DetailProduct: {screen: DetailProduct}
})

AppRegistry.registerComponent('ShoppingListRN', () => Navigator);
