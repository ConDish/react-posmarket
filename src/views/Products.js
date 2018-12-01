import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Container, Toast, Button, Text, Card, Form, Input, Item, Spinner, CardItem, Body, Thumbnail, List, ListItem, Left, Right, Label } from 'native-base';
import * as Expo from 'expo';
import Icon from 'react-native-vector-icons/Entypo';
import HeaderUser from '../components/HeaderUser';




class Products extends Component {

    static navigationOptions = {
        title: '',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="shop" style={{ color: tintColor, fontSize: 25 }} />
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
            loading: true,
            dataSoucer : [],
            producto: '',
            loadingProducts : false,
        }

        console.disableYellowBox = true;

    }


    onDetalles(nombre, tipo, precio) {
        Alert.alert(
            nombre,
            'Tipo del producto: ' + tipo + '\n' + 'Valor: ' + precio,
            [
                { text: 'OK' },
            ],
            { cancelable: false }
        )
    }

    renderItem = ({ item }) => {


        if (item.nulo == "true") {
            return (
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>


                </View>

            )

        } else {

            if(!this.state.loadingProducts){

            
            return (
                <TouchableOpacity
                    onPress={() => this.onDetalles(item.nombre, item.tipo_producto, item.precio)}
                >
                <Card>
                    <CardItem>
                        
                                <Left>
                                        <Thumbnail large source={{ uri: item.imagen }}/>
                                </Left>
                                <Body>
                                    <Text>{item.nombre}</Text>
                                </Body>
                                <Right>
                                    <Button transparent>
                                        <Text>Comprar</Text>
                                    </Button>
                                </Right>

                            
                    </CardItem>
                </Card>
                </TouchableOpacity>

            )
            }
        }
    }
    // Funcion Buscar
    async onBuscar() {

        this.setState({ loadingLogin: true });

        const producto = {
            producto: this.state.producto
        }


        const url = 'https://samioff15.000webhostapp.com/datos.php?op=4&producto=' + producto.producto;

        await fetch(url).then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataSource: responseJson
                });

                this.setState({ loadingLogin: false });

            })
            .catch((error) => {
                console.log(error)
            })

    }

    // Es el primer llamado de los productos
    async componentDidMount() {
        this.setState({ loadingLogin: true });
        const url = 'https://samioff15.000webhostapp.com/datos.php?op=1';

        await fetch(url).then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson
                })
                this.setState({ loadingLogin: false });
            })
            .catch((error) => {
                console.log(error)
            })

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
            let renderSpinner = (this.state.loadingLogin) ? <Spinner color='#1da1f2' /> : <FlatList
                data={this.state.dataSource}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
            />;

            return (


                <Container>

                    <HeaderUser props={this.props} title="Home" style="#FFF" />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                        <Form style={{ width: '60%' }}>
                            <Item>
                                
                                <Input placeholder="Busca tu producto" onChangeText={(producto) => this.setState({ producto })} />
                            </Item>
                        </Form>
 
                        <Button bordered info
                            onPress={() => this.onBuscar()}
                        >
                            <Text>Buscar</Text>
                        </Button>
                    </View>
                    {renderSpinner}
                    
                </Container>
            );
        }

}




export default Products;