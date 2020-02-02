import React, {Component} from 'react'
import {
    View, Text, Alert, ScrollView, CameraRoll, Image, PermissionsAndroid,
    TouchableHighlight, ToastAndroid,
} from 'react-native'
import Styles from "../common/Styles";

export default class Status extends Component {

    constructor(props) {
        super(props)

        this.state = {
            notification: 'Starting grant permission...',
            photos: []
        }
    }

    componentWillMount = () => {
        this.requestReadSdcardPermission()
    }

    componentDidMount = () => {
    }

    requestReadSdcardPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'Read external storage permission',
                    'message': 'Allow reading external storage?'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({notification: 'Start loading images from sdcard'})
                this.loadImages()
            } else {
            }
        } catch (err) {
            Alert.alert("Error grant permission: " + err)
        }
    }

    loadImages = () => {
        CameraRoll.getPhotos({
            first: 100,
            assetType: 'All',
        })
            .then(r => {
                if (r !== undefined && r.edges !== undefined) {
                    this.setState({notification: 'Loading images is finished', photos: r.edges});
                }
            })
            .catch((err) => {
                Alert.alert("Error: " + err)
            })
    }

    render() {
        return (
            <View style={Styles.status_parent}>
                <View style={Styles.status_notification_parent}>
                    <Text style={Styles.status_notification}
                          numberOfLines={2}
                          ellipsizeMode='tail'>{this.state.notification}</Text>
                </View>
                <View style={Styles.status_image_parent}>
                    <ScrollView contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row',}}>
                        {
                            this.state.photos.map((photo, i) => {
                                return (
                                    <TouchableHighlight
                                        style={Styles.status_image_item_button}
                                        key={i}
                                        underlayColor='transparent'
                                        onPress={() => {
                                            ToastAndroid.show("Index " + i, ToastAndroid.SHORT)
                                        }}
                                    >
                                        <Image
                                            key={i}
                                            style={Styles.status_image_item}
                                            source={{uri: photo.node.image.uri}}
                                        />
                                    </TouchableHighlight>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}