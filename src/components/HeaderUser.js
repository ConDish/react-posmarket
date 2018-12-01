import React, { Component } from 'react';
import { Header, View, Text, Thumbnail } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AsyncStorage, TouchableOpacity } from 'react-native';

class HeaderUser extends Component {

    constructor(props) {
        super(props);
    }

    openDrawer() {
        this.props.props.navigation.openDrawer();
    }





    render() {
        return (
            <Header style={{ backgroundColor: this.props.style, justifyContent: 'space-between', alignItems: 'flex-end', height: 80, paddingBottom: 10, marginBottom: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                    
                    <TouchableOpacity onPress={() => this.openDrawer()}>
                        <Thumbnail small source={{ uri: 'https://picsum.photos/640/363' }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold', marginLeft: 10, }}>{this.props.title}</Text>
                </View>

  
            </Header>
        );
    }


}




export default HeaderUser;