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
'use stric'
import React, { Component } from 'react';
import { StyleSheet, View, WebView, AsyncStorage, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, Footer, FooterTab, Card, CardItem, Body, Toast, Spinner, H1, Thumbnail } from 'native-base';
import  md5  from 'md5';

const { width, height } = Dimensions.get('screen');



class Login extends Component {




    static navigationOptions = {
        title: 'Welcome',
        headerStyle: {
            backgroundColor: "#1da1f2"
        },
        headerTintColor: '#fff'
    }

    constructor(props) {
      super(props)
    
      this.state = {
         email : '',
         password : '',
         loading: true,
         loadingLogin : false,
      }

        console.disableYellowBox = true;
    }


    // Cargando fuentes de native-base
    async componentWillMount() {


        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
            Spotlight: require("../fonts/Spotlight.otf"),
        }); 

        this.setState({ loading: false });



    }

    async onLogin() {

        this.setState({ loadingLogin: true });

        let formData = new FormData();
        
        const url = 'https://samioff15.000webhostapp.com/datos.php?op=2';

        formData.append("email", this.state.email );
        formData.append("password", md5(this.state.password));

        let response = await fetch(url, {
            method: 'POST',
            body: formData
        }).then((response) => response.json());


        if(response.login == "success"){

            this.setState({ loadingLogin: false });
           Toast.show({
               text: `Welcome ${response.dato.nombre}!`,
               type: 'success',
               duration: 1000
           });

           await AsyncStorage.setItem('userToken', response.dato.nombre);

           this.props.navigation.navigate('App');
        }else{

            this.setState({ loadingLogin: false });
            Toast.show({
                text: `Incorrect user o password!`,
                type: 'danger',
                duration: 4000
            });


        }

    }




    render() {

        if (this.state.loading) {
            return <Expo.AppLoading />;
        }

        let renderSpinner = (this.state.loadingLogin) ? <Spinner color='white' /> : null;

        return(
            <Container>
                 <ScrollView>
                <Container style={{ padding: 15, height: height, justifyContent: 'center'}}>
                   
                    <Card>
                        <CardItem>
                            <Body style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                    <Thumbnail large source={require('./img/logo.png')}/>
                            </Body>
                        </CardItem>
                        
                        <CardItem>
                        <Body>
                            <Form style={{ width: '100%'}}>
                                <Item stackedLabel>
                                    <Label style={{ color: 'black'}}>Email</Label>
                                    <Input onChangeText={(email) => this.setState({email})}/>
                                </Item>
                                <Item stackedLabel style={{ marginTop : 50}}>
                                    <Label style={{ color: 'black'}}>Password</Label>
                                    <Input secureTextEntry={true} onChangeText={(password) => this.setState({password})}/>
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
                                    <TouchableOpacity>
                                            <Text style={{ color: '#1c94e0'}}>Forgot your password?</Text>
                                    </TouchableOpacity>
                                    <Button style={{ backgroundColor: '#1da1f2', width: '100%', marginTop: 20 }} block
                                            onPress={() => this.props.navigation.navigate('SingUp')}
                                    >
                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Sing Up</Text>
                                    </Button>
                                        <Button style={{ backgroundColor: '#1da1f2', width: '100%', marginTop : 20 }} block
                                        onPress = {() => this.onLogin()}
                                    >
                                        {renderSpinner}
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Log in</Text>
                                    </Button>
                                
                                </Body>
                            
                        </CardItem>
                    </Card>
                   
               
                </Container>
                </ScrollView>


                <Footer style={{ backgroundColor: '#fff' }}>
                    <Text style={{ marginTop: 10 }}>&#169; CopyRight Posmarket</Text>
                </Footer>
                
            </Container>
        )
    }
}

export default Login;