import {Dimensions, StyleSheet} from 'react-native'
import {AppStrings, AppColors, AppFontSizes, AppServer} from '../common/Constants'

const {width, height} = Dimensions.get('window')

export default Styles = StyleSheet.create({
    activity_indicator: {
        flex: 1, justifyContent: 'center'
    },
    // login screen
    login_parent: {
        flex: 1, flexDirection: 'column', padding: 16
    },
    login_logo_layout: {
        flex: 1, flexDirection: 'column'
    },
    login_logo_view: {
        flex: 4, alignItems: 'center'
    },
    login_logo_image: {
        flex: 1, resizeMode: 'contain'
    },
    login_input_layout: {
        flex: 1, flexDirection: 'column', alignItems: 'center',
        marginLeft: 16, marginRight: 16,
    },
    login_button_layout: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 16,
    },
    login_textinput: {
        alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, fontSize: AppFontSizes.textsize_18_sp
    },
    // device screen
    device_parent: {
        flex: 1, padding: 10
    },
    device_list_item_parent: {
        flex: 1, flexDirection: 'row', backgroundColor: "#D6DCDB", borderRadius: 8,
    },
    device_list_item_image1: {
        flex: 1, height: 40, width: 40, margin: 8
    },
    login_list_item_title: {
        flex: 4, height: 56, flexDirection: 'row', alignItems: 'center'
    },
    device_list_item_title_text: {
        flex: 1, fontSize: 18, padding: 8, color: "black"
    },
    device_list_item_image2_parent: {
        flex: 0.5, margin: 13,
    },
    device_list_item_image2: {
        height: 30, width: 30,
    },
    // status screen
    status_parent: {
        flex: 1, flexDirection: 'column', justifyContent: 'space-between',
    },
    status_notification_parent: {
        flexDirection: 'row', height: 56, alignItems: 'center', backgroundColor: '#34495E'
    },
    status_notification: {
        flex: 1, fontSize: 14, marginLeft: 16, marginRight: 16, color: "white", justifyContent: 'center',
    },
    status_image_parent: {
        flex: 1, backgroundColor: '#283747',
    },
    status_image_item_button: {
        width: (width) / 4, height: (width) / 4, alignSelf: 'center', alignItems: 'center'
    },
    status_image_item: {
        width: (width) / 4, height: (width) / 4, alignSelf: 'center'
    }
})