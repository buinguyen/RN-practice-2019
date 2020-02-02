import React from 'react';
import {View, ScrollView, Dimensions, Text, Image, StyleSheet, RefreshControl,
    ToastAndroid} from 'react-native';

var {width, height} = Dimensions.get('window');

const Page = (props) => {
    return (<View style={{
        width: width,
        height: height,
        backgroundColor: `${props.backgroundColor}`,
    } }>
        <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center'}}
        >
            {props.textContent}
        </Text>
    </View>)
}

export default class ScrollViewExample extends React.Component {
    render() {
        return (
            <View>
                <ScrollView
                    maximumZoomScale={2}
                    minimumZoomScale={0.2}
                    onMomentumScrollBegin={() => {
                        //ToastAndroid.show('Start scroll', ToastAndroid.SHORT);
                    }}
                    onMomentumScrollEnd={() => {
                        //ToastAndroid.show('End scroll', ToastAndroid.SHORT);
                    }}
                    onScroll={(event) => {
                        //ToastAndroid.show(`contentOffset = ${JSON.stringify(event.nativeEvent.contentOffset)}`, ToastAndroid.SHORT);
                    }}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={()=>{
                        ToastAndroid.show('Start refreshing', ToastAndroid.SHORT);
                    }}/>}
                    horizontal
                    pagingEnabled
                    showHorizontalScrollIndicator
                >
                    <Page backgroundColor={'red'} textContent={'Page 1'}></Page>
                    <Page backgroundColor={'green'} textContent={'Page 2'}></Page>
                    <Page backgroundColor={'blue'} textContent={'Page 3'}></Page>
                </ScrollView>
            </View>
        )
    }
}