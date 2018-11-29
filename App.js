import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Root } from 'native-base';
import Expo from "expo";
// Views
import HomeView from './src/views/Home';
import LoginView from './src/views/Login';
import SingUpView from './src/views/SingUp';
import AuthLoadingView from './src/views/AuthLoading';





const AppDrawer = createDrawerNavigator(
  {
    Home: HomeView,

  },
  {
    initialRouteName: 'Home',
  }
);

const AppNavigator = createStackNavigator(

  {
    Login: LoginView,
    SingUp: SingUpView,
  }

);

const Menu = createSwitchNavigator(
  {
    AuthLoading : AuthLoadingView,
    App : AppDrawer,
    Auth : AppNavigator,

  },
  {
    initialRouteName: 'AuthLoading',
  }
)



const AppContainer = createAppContainer(Menu);


export default () =>
  <Root>
    <AppContainer />
  </Root>

