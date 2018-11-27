import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Views
import LoginView from './src/views/Login';
import SingUpView from './src/views/SingUp';
import HomeView from './src/views/Home';

// Menu 
const Menu = createStackNavigator(
  {
    Home : HomeView,
    Login : LoginView,
    SingUp : SingUpView,
  },
  {
    initialRouteName : 'Home',
    navigationOptions : {
      headerStyle : {
        backgroundColor: "#0288d1"
      },
      headerTintColor : '#fff',
    }
  }
)

export default() => <Root> <Menu/> </Root>
