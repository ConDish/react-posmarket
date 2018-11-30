import React, { Component } from 'react';
import { Header, View, Text } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

class HeaderUser extends Component {

    constructor(props) {
        super(props);
    }

    openDrawer() {
        this.props.props.navigation.openDrawer();
    }


    async signOut() {
        await AsyncStorage.clear();
        this.props.props.navigation.navigate('Auth');
    }


    render() {
        return (
            <Header style={{ backgroundColor: this.props.style, justifyContent: 'space-between', alignItems: 'flex-end', height: 80, paddingBottom: 10, marginBottom: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome name="bars" style={{ color: 'white', fontSize: 30 }} onPress={() => this.openDrawer()} />
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginLeft: 10, }}>{this.props.title}</Text>
                </View>

                <View>
                    <FontAwesome name="sign-out" style={{ color: 'white', fontSize: 30 }} onPress={() => this.signOut()} />
                </View>
            </Header>
        );
    }


}




export default HeaderUser;