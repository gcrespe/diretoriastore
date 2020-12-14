import React from 'react';

import { View, Text, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

const { width, height } = Dimensions.get('screen');

interface MenuProps{
    navigation: any;
}

const MenuComponent = (props: MenuProps) => {

    const { navigation } = props;
         
    let _menu: any;

    const setMenuRef = (ref: any) => {
        _menu = ref;
    };

    const hideMenu = () => {
        if(_menu != null ){
            _menu.hide()
        };
    };

    const showMenu = () => {
        _menu.show();
    };

    const handleMenuButtonClick = (navigationDirection?: string) => {

        navigation.navigate(navigationDirection);
        _menu.hide();
    }

    return (
        <View style={{alignItems: 'center', justifyContent: 'center' }}>
        <Menu
            ref={setMenuRef}
            animationDuration={250}
            button={
                <TouchableOpacity onPress={showMenu}>
                    <Image source={require('../../assets/img/menu-icon.png')} style={{tintColor: '#000000'}} resizeMode={"center"}/>
                </TouchableOpacity>
            }
            style={{width: width*0.7, height: height*0.91, alignContent: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: '17%', marginTop: '2%'}}
        >
            <View style={{width: '100%', height: height*0.4}}>
                <View style={{width: width*0.6, height: height*0.4, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <Text style={{paddingTop: 20, letterSpacing: 5}}>
                        DIRETORIA STORE
                    </Text>
                    <View style={{borderBottomWidth: 0.2, width: width*0.85, paddingTop: 20}}/>
                    <Text style={{paddingTop: 20, letterSpacing: 5, fontSize: 12}}>
                        CLOTHING
                    </Text>
                </View>
            </View>
            <MenuItem style={{width: '100%', maxWidth: '100%', justifyContent: 'center', marginLeft: '3%'}} onPress={() => handleMenuButtonClick('Home')}>
                <View style={{width: '100%'}}> 
                    <Text style={{textAlignVertical: 'center'}}>
                        Home
                    </Text>    
                </View>
            </MenuItem>
            <MenuItem style={{width: '100%', height: '10%', maxWidth: '100%', justifyContent: 'center', marginLeft: '3%'}} onPress={() => handleMenuButtonClick('Perfil')}>
                <View style={{width: '100%'}}> 
                    <Text style={{textAlignVertical: 'center'}}>
                        Perfil
                    </Text>    
                </View>
            </MenuItem>
            <MenuItem style={{width: '100%', maxWidth: '100%', justifyContent: 'center', marginLeft: '3%'}} onPress={() => handleMenuButtonClick('Carrinho')}>
                <View style={{width: '100%'}}> 
                    <Text style={{textAlignVertical: 'center'}}>
                        Carrinho
                    </Text>    
                </View>
            </MenuItem>
            <MenuDivider /> 
            
            <MenuItem style={{width: '100%', maxWidth: '100%'}} onPress={() => handleMenuButtonClick('Login')}>Logout</MenuItem>
        </Menu>
        </View>
    );
}

export default MenuComponent;