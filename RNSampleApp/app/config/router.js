import React from 'react'
import {StackNavigator} from 'react-navigation'
import { AppStrings, AppColors} from '../common/Constants'
import Splash from '../views/Splash'
import Login from '../views/Login'
import Device from '../views/Device'
import Status from '../views/Status'

export const AppNavigator = StackNavigator({
    SplashScreen: {
        screen: Splash,
        navigationOptions: {
            header: false
        }
    },
    LoginScreen: {
        screen: Login,
        navigationOptions: {
            title: AppStrings.login_title,
            headerTintColor: AppColors.white,
            headerStyle: {
                backgroundColor: AppColors.green
            },
        }
    },
    DeviceScreen: {
        screen: Device,
        navigationOptions: {
            title: AppStrings.device_title,
            headerTintColor: AppColors.white,
            headerStyle: {
                backgroundColor: AppColors.green
            },
        }
    },
    StatusScreen: {
        screen: Status,
        navigationOptions: {
            title: AppStrings.status_title,
            headerTintColor: AppColors.white,
            headerStyle: {
                backgroundColor: AppColors.green
            },
        }
    }
})

