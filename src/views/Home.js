import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Container, Toast, Button, Text, Card, Form, Input, Item, CardItem, Thumbnail, Body} from 'native-base';
import * as Expo from 'expo';
import { createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderUser from '../components/HeaderUser';

// Views

import ProductsView from './Products';

class Home extends Component {


    static navigationOptions = {
        title : '',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="home" style={{ color: tintColor, fontSize: 25 }} />
            
          ),
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#24A5EF',
            inactiveTintColor: '#494949',
            labelStyle: {
                fontSize: 10,

            },
            style: {
                backgroundColor: '#FFF',
                height: 45
            },
            indicatorStyle: {
                borderBottomColor: '#FFF',
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
                <HeaderUser props={this.props} title="Home" style="#FFF" />
            
               <Card >
                    <CardItem style={{ justifyContent: 'center' }}>
                       <Thumbnail source={require('./img/logo.png')}/>
                   </CardItem>
               </Card>

               <Card>
                   <CardItem>
                        <Body>
                            <Text style={{ color: '#1da1f2', fontSize: 23, fontWeight: 'bold'}}>Mision</Text>
                            <Text note>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia reiciendis itaque nostrum, cum esse sint ad architecto sequi exercitationem cupiditate laboriosam alias obcaecati repellendus perspiciatis quidem, voluptas similique vero? Cupiditate!</Text>
                        </Body>
                   </CardItem>
               </Card>
                <Card>
                    <CardItem>
                        <Body>
                            <Text style={{ color: '#1da1f2', fontSize: 23, fontWeight: 'bold' }}>Vision</Text>
                            <Text note>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia reiciendis itaque nostrum, cum esse sint ad architecto sequi exercitationem cupiditate laboriosam alias obcaecati repellendus perspiciatis quidem, voluptas similique vero? Cupiditate!</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Card>
                    
                    <CardItem>
                        <Body>
                            <Text style={{ color: '#1da1f2', fontSize: 23, fontWeight: 'bold' }}>Desarrolladores</Text>
                        </Body>
                    </CardItem>
                    <CardItem style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <ScrollView
                            horizontal={true} style={{ width: '90%' }}>
                            <Thumbnail large source={require('./img/pp.jpg')} style={{ marginRight: 5 }} />
                        </ScrollView>
                    </CardItem>
                    
                    
                </Card>

               
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