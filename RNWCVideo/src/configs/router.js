import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import VideoList from '../views/VideoList'
import {AppStrings, AppColors} from '../common/Constants'

export const AppNavigator = StackNavigator({
    VideoList: {
        screen: VideoList,
        navigationOptions: {
            title: AppStrings.video_list_name,
            headerTintColor: AppColors.white,
            headerStyle: {
                backgroundColor: AppColors.green
            }
        }
    }
})