import React from 'react';
import { StyleSheet, FlatList, DrawerItems, SafeAreaView, ScrollView, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Root, Container, Header, Content, ListItem, Text, Icon, View, Button, Thumbnail, Separator, List, Left, Right } from 'native-base';
import Expo from "expo";
import { FontAwesome } from '@expo/vector-icons';

// Views
import HomeView from './src/views/Home';
import ProductsView from './src/views/Products';
import LoginView from './src/views/Login';
import SingUpView from './src/views/SingUp';
import AuthLoadingView from './src/views/AuthLoading';

var user = '';

const { width, height } = Dimensions.get('screen');

const getUser = async () => {
  user = await AsyncStorage.getItem('userToken');

}

const signOut = async (props) => {
  await AsyncStorage.clear();
  props.navigation.navigate('Auth');
}


const CustomDrawerContentComponent = (props) => {

  getUser();



  return (
    <Container>
      
      <Header style={{ height: 170,  backgroundColor: '#FFF' }}>

        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center', marginTop: 20}}>
          <Thumbnail large source={{uri: 'https://picsum.photos/640/363'}} />
          <Text style={{ color: 'black', fontSize: 22, fontStyle: 'normal', marginLeft: 10, marginTop: 10 }} >Welcome {user}</Text>
          
        </View>
        

      </Header>
      <Content>
        <ListItem noBorder>
          <Text>Perfil</Text>
        </ListItem>
        <ListItem noBorder>
          <Left>
            <Text>Followers</Text>
          </Left>
          <Right>
            <Text>0</Text>
          </Right>
          
        </ListItem>
        <ListItem noBorder>
          <Left>
            <Text>Shopping Cart</Text>
          </Left>
          <Right>
            <Text>0</Text>
          </Right>

        </ListItem>
        <Separator bordered>
          <Text>Configuracion</Text>
        </Separator>
        <ListItem noBorder>
          <Text>Privacidad</Text>
        </ListItem>

        <ListItem noBorder onPress={() => signOut(props)}>
          <Text>Cerrar Seccion</Text>
        </ListItem>

        
      </Content>
      


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
    drawerWidth: Math.min(height, width) * 0.8,

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

