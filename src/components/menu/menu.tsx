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
            button={
                <TouchableOpacity onPress={showMenu}>
                    <Image source={require('../../assets/img/menu-icon.png')} style={{tintColor: '#000000'}} resizeMode={"center"}/>
                </TouchableOpacity>
            }
            style={{width: width*0.7, height: height*0.91, alignContent: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: '17%', marginTop: '2%'}}
        >
            <View style={{width: '100%', height: height*0.2}}>

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
            
            <MenuItem style={{width: '100%', maxWidth: '100%'}} onPress={hideMenu}>Logout</MenuItem>
        </Menu>
        </View>
    );
}

export default MenuComponent;