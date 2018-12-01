import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { Container, Form, Item, Label, Input, Button, Text, Footer, FooterTab, Card, CardItem, Body, Toast, Spinner, H1, Thumbnail, Content } from 'native-base';
import md5 from 'md5';

const { width, height } = Dimensions.get('screen');




class SingUp extends Component {

  

  static navigationOptions = {
    title: 'SingUp',
  }
  constructor(props){
    super(props)

    this.state = {
        email : '',
        name : '',
        lastname: '',
        password: '',
        cedula:'',
        celular:'',
        loadingSingUp : false,
    }

    console.disableYellowBox = true;
  }

  async SingUp(){
      this.setState({ loadingSingUp: true});
      let formData = new FormData();
      const url = 'https://samioff15.000webhostapp.com/datos.php?op=3';

      formData.append("name", this.state.name);
      formData.append("lastname", this.state.lastname);
      formData.append("cedula", this.state.cedula);
      formData.append("celular", this.state.celular);
      formData.append("email", this.state.email);
      formData.append("password", md5(this.state.password));

      let response = await fetch(url, {
        method: 'POST',
        body: formData
      }).then((response) => response.json());

      if (response.logeado == "success") {


        this.setState({ loadingSingUp: false });
        Toast.show({
          text: `Welcome ${response.dato}!`,
          type: 'success',
          duration: 500
        });

        await AsyncStorage.setItem('userToken', response.dato);

        this.props.navigation.navigate('App');
      } else {

        this.setState({ loadingSingUp: false });
        Toast.show({
          text: `User already exists!`,
          type: 'danger',
          duration: 4000
        });


      }



  }


  render() {

    let renderSpinner = (this.state.loadingSingUp) ? <Spinner color='white' /> : null;
    return (
      <Container>

        <Container style={{ padding: 20, height : height, justifyContent: 'center' }}>
        
        <Card>
          
          <CardItem>
            <Body style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
              <Thumbnail large source={require('./img/logo.png')} />
            </Body>
          </CardItem>

          
          <CardItem>
            
            <Body>
              <Form style={{ flexDirection: 'row', width: '100%'}}>
                <Item stackedLabel style={{ width:  '50%'}}>
                  <Label style={{ color: 'black'}}>Name</Label>
                  <Input onChangeText={(name) => this.setState({name})}/>
                </Item>
                <Item stackedLabel style={{ width: '40%' }}>
                  <Label style={{ color: 'black'}}>Last Name</Label>
                  <Input onChangeText={(lastname) => this.setState({ lastname })} />
                </Item>

              </Form>
                <Form style={{ flexDirection: 'row', width: '100%', marginTop: 40}}>
                <Item stackedLabel style={{ width:  '50%'}}>
                  <Label style={{ color: 'black'}}>Cedula</Label>
                  <Input onChangeText={(cedula) => this.setState({cedula})}/>
                </Item>
                <Item stackedLabel style={{ width: '40%' }}>
                  <Label style={{ color: 'black'}}>Tell</Label>
                  <Input onChangeText={(celular) => this.setState({ celular })} />
                </Item>

              </Form>
              <Form style={{ flexDirection: 'row', marginTop: 40, width:'100%' }}>
                <Item stackedLabel style={{ width: '50%' }}>
                  <Label style={{ color: 'black'}}>Email</Label>
                  <Input onChangeText={(email) => this.setState({ email })} />
                </Item>
                <Item stackedLabel style={{ width: '40%' }}>
                  <Label style={{ color: 'black'}}>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                </Item>
              </Form>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button style={{ backgroundColor: '#1da1f2', width: '100%', marginTop: 30 }} block
                onPress={() => this.SingUp()}
              >
                  {renderSpinner}
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Sing Up</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
        
        </Container>


        <Footer style={{ backgroundColor: '#fff' }}>
          <Text style={{ marginTop: 10 }}>&#169; CopyRight Posmarket</Text>
        </Footer>
        
        
      </Container>
    )
  }
}

export default SingUp;