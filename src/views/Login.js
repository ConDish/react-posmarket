/*
###########################################################
#                                                         #
#_________               ________  .__       .__          #
#\_   ___ \  ____   ____ \______ \ |__| _____|  |__       #
#/    \  \/ /  _ \ /    \ |    |  \|  |/  ___/  |  \      #
#\     \___(  <_> )   |  \|    `   \  |\___ \|   Y  \     #
# \______  /\____/|___|  /_______  /__/____  >___|  /     #
#        \/            \/        \/        \/     \/      #
#                                                         #
###########################################################
*/

import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, Footer, FooterTab, Card, CardItem, Body } from 'native-base';





class Login extends Component {




    static navigationOptions = {
        title: 'Welcome',
        headerLeft: null,
        headerStyle: {
            backgroundColor: "#900C3F"
        },
        headerTintColor: '#fff'
    }

    constructor(props) {
      super(props)
    
      this.state = {
         username : '',
         password : '',
         loading: true,
      }

        console.disableYellowBox = true;
    }


    // Cargando fuentes de native-base
    async componentWillMount() {


        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
        }); 

        this.setState({ loading: false });



    }


    // Verificar captcha
    verifyCallback = (recaptchaToken) =>{
        console.log(recaptchaToken, " my recaptcha token");
    }

    exppiredCallback = (data) => {
        console.log(data);
    };




    render() {

        if (this.state.loading) {
            return <Expo.AppLoading />;
        }

        return(
            <Container>

                <Container>
                <Card style = {{ marginTop: 50 }}>
                    <CardItem>
                    <Body>
                        <Form>
                            <Item stackedLabel>
                                <Label style={{ color: '#900C3F'}}>Username</Label>
                                <Input onChangeText={(username) => this.setState({username})}/>
                            </Item>
                            <Item stackedLabel style={{ marginTop : 50}}>
                                <Label style={{ color: '#900C3F'}}>Password</Label>
                                <Input onChangeText={(password) => this.setState({password})}/>
                            </Item>
                        </Form>
                    </Body>
                    </CardItem>
                                           
                       <View style ={{ height : 140}}>
                                <WebView
                                    
                                    automaticallyAdjustContentInsets = {false}
                                    javaScriptEnabled={true}
                                    source={{ uri: 'http://python-posmarket.herokuapp.com/recaptcha'}}

                                />
                        </View>
                    <CardItem>
                        <Body>
                            <Button style={{ backgroundColor: '#900C3F', width: '100%', marginTop : 20 }} block>
                                <Text>Login</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
                </Container>


                <Footer style={{ backgroundColor: '#fff' }}>
                    <Text style={{ marginTop: 10 }}>&#169; CopyRight ConDish</Text>
                </Footer>
                
            </Container>
        )
    }
}

export default Login;