import React from 'react';
import { StyleSheet, FlatList, DrawerItems, SafeAreaView, ScrollView, AsyncStorage } from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Root, Container, Header, Content, ListItem, Text, Icon, View, Button, Thumbnail } from 'native-base';
import Expo from "expo";
import { FontAwesome } from '@expo/vector-icons';

// Views
import HomeView from './src/views/Home';
import ProductsView from './src/views/Products';
import LoginView from './src/views/Login';
import SingUpView from './src/views/SingUp';
import AuthLoadingView from './src/views/AuthLoading';

var user = '';


const getUser = async () => {
  user = await AsyncStorage.getItem('userToken');

}



const CustomDrawerContentComponent = (props) => {

  getUser();



  return (
    <Container>
      <Header style={{ backgroundColor: '#900C3F', height: 140 }}>

        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center'}}>
          <Thumbnail large source={{uri: 'https://picsum.photos/640/363'}} />
          <Text style={{ color: 'white', fontSize: 22, fontStyle: 'italic', marginLeft: 10 }} >Hello {user}</Text>
          
        </View>
        

      </Header>


    </Container>
  );
}





const AppDrawer = createDrawerNavigator(
  {
    Home: HomeView,
    Products: ProductsView
    
  },
  {
    initialRouteName: 'Home', 
    contentComponent: CustomDrawerContentComponent,

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
    initialRouteName: 'App',
  }
)



const AppContainer = createAppContainer(Menu);


export default () =>
  <Root>
    <AppContainer />
  </Root>

