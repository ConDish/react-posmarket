import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, Footer, FooterTab } from 'native-base';




class Login extends Component {

    static navigationOptions = {
        title: 'Welcome',
        headerLeft: null,
        headerStyle: {
            backgroundColor: "#900C3F"
        },
        headerTintColor: '#fff',
    }

    constructor(props) {
      super(props)
    
      this.state = {
         username : '',
         password : '',
         loading: true,
      }
    }
    
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            FontAwesome: require("@expo/vector-icons/fonts/FontAwesome.ttf"),
        });

        this.setState({ loading: false });
    }



    render() {

        if (this.state.loading) {
            return <Expo.AppLoading />;
        }

        return(
            <Container>
                <Form style = {{ marginTop : 50}}>
                    <Item stackedLabel>
                        <Label style={{ color: '#900C3F'}}>Username</Label>
                        <Input onChangeText={(username) => this.setState({username})}/>
                    </Item>
                    <Item stackedLabel style={{ marginTop : 50}}>
                        <Label style={{ color: '#900C3F'}}>Password</Label>
                        <Input onChangeText={(password) => this.setState({password})}/>
                    </Item>
                </Form>
                <Container style={{ flexDirection : 'row', justifyContent : 'center', marginTop : 55}}>
                    <Button style={{ backgroundColor: '#900C3F', width : '100%'}} block>
                        <Text>Login</Text>
                    </Button>
                </Container>
                <Footer style={{ backgroundColor : '#fff'}}>
                    <Text style={{ marginTop: 10}}>&#169; CopyRight</Text>
                </Footer>
            </Container>
        )
    }
}

export default Login;