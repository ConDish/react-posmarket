import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Toast, Button, Text, Card, Form, Input, Item } from 'native-base';
import * as Expo from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import HeaderUser from '../components/HeaderUser';




class Products extends Component {

    static navigationOptions = {
        title: '',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="shopping-cart" style={{ color: 'white', fontSize: 30 }} />
            
          ),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#000',
            labelStyle: {
                fontSize: 10,

            },
            style: {
                backgroundColor: '#AA27E8',
                height: 50
            },
            indicatorStyle: {
                borderBottomColor: '#AA27E8',
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
                <HeaderUser props={this.props} title="Products" style="#AA27E8" />
                <Text>Hola</Text>

            </Container>
        );
    }

}




export default Products;