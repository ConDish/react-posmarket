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
import { StyleSheet, View, WebView, AsyncStorage } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, Footer, FooterTab, Card, CardItem, Body, Toast } from 'native-base';
import  md5  from 'md5';




class Login extends Component {




    static navigationOptions = {
        title: 'Welcome',
        headerStyle: {
            backgroundColor: "#900C3F"
        },
        headerTintColor: '#fff'
    }

    constructor(props) {
      super(props)
    
      this.state = {
         email : '',
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

    async onLogin() {

        let formData = new FormData();
        
        const url = 'https://samioff15.000webhostapp.com/datos.php?op=2';

        formData.append("email", this.state.email );
        formData.append("password", md5(this.state.password));

        let response = await fetch(url, {
            method: 'POST',
            body: formData
        }).then((response) => response.json());


        if(response.login == "succes"){
            
           Toast.show({
               text: `Welcome ${response.dato.nombre}`,
               type: 'success',
               duration: 4000
           });

           await AsyncStorage.setItem('userToken', response.dato.nombre);

           this.props.navigation.navigate('App');
        }

    }




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
                                <Label style={{ color: '#900C3F'}}>Email</Label>
                                <Input onChangeText={(email) => this.setState({email})}/>
                            </Item>
                            <Item stackedLabel style={{ marginTop : 50}}>
                                <Label style={{ color: '#900C3F'}}>Password</Label>
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
                            <Button style={{ backgroundColor: '#900C3F', width: '100%', marginTop : 20 }} block
                                onPress = {() => this.onLogin()}
                            >
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