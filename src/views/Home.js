import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Toast, Button, Text, Card, Form, Input, Item, Icon } from 'native-base';
import * as Expo from 'expo';
import { createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import HeaderUser from '../components/HeaderUser';

// Views

import ProductsView from './Products';

class Home extends Component {


    static navigationOptions = {
        title : '',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="home" style={{ color: 'white', fontSize: 30 }} />
            
          ),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#000',
            labelStyle: {
                fontSize: 10,

            },
            style: {
                backgroundColor: '#3897BB',
                height: 50
            },
            indicatorStyle: {
                borderBottomColor: '#3897BB',
                borderBottomWidth: 2,
            },

        }


    }


    constructor(props) {
        super(props);


        this.state = {
            loading: true
        }

        console.disableYellowBox = true;

    }




    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });

        this.setState({ loading: false });
    }




    render() {


        if (this.state.loading) {
            return <Expo.AppLoading />;
        }


        return (
            <Container>
                <HeaderUser props={this.props} title="Home" style="#3897BB" />

               <Text>Hola desde home</Text>

               
            </Container>
        );
    }
    

}

const Tabs = createMaterialTopTabNavigator(
    {
        Home : Home,
        Products : ProductsView
    },
    {
          // Agregar estilos o iconos a mi tabnavigator
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom',


    }
)

const AppContainer = createAppContainer(Tabs);





export default AppContainer;