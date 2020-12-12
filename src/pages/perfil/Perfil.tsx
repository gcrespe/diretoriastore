import React from 'react';
import { View, Text, Dimensions, ScrollView, TouchableHighlight, Image} from 'react-native';
import { inject, observer } from 'mobx-react';
import { Stores } from '../../stores/stores';
import { useToast } from 'react-native-styled-toast'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MenuComponent from '../../components/menu/menu';

const { width, height } = Dimensions.get('screen');

interface PerfilProps{
    store: typeof Stores;
    navigation: any;
}


const Perfil = inject('store')(observer((props: PerfilProps) => {

    const { userStore } = Stores;
    const { navigation } = props;

    const {toast}  = useToast();

    const handleLogout = () => {
        navigation.navigate('Login');
        toast({
            message: 'Logout realizado!',
            color: "#c0c0c0"
        })
        userStore.reset();
    }

    return (
        <>
            <ScrollView style={{backgroundColor: "#FFFFFF", height: height}}>
                <View style={{alignContent: "center", justifyContent: "center", alignItems: "center"}}>
                    <View style={{width: width, height: height*0.17, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                        <View style={{width: width, flexDirection: "row", justifyContent: 'space-evenly', marginBottom: -10}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
                                <Image source={require('../../assets/img/cart-icon.png')} style={{tintColor: '#000000'}} resizeMode={"center"}/>
                            </TouchableOpacity>
                            <Text style={{paddingTop: 20, letterSpacing: 5, marginHorizontal: 20}}>
                                DIRETORIA STORE
                            </Text>
                            <MenuComponent navigation={navigation}/>
                        </View>
                        
                        <View style={{borderBottomWidth: 0.2, width: width*0.85, paddingTop: 20}}/>
                        <Text style={{paddingTop: 20, letterSpacing: 5, fontSize: 12}}>
                            Perfil
                        </Text>
                    </View>
                    <View style={{flexDirection: "column", width: width, justifyContent: "center", paddingTop: 30, alignContent: "center", alignItems: "center"}}>
                        <View style={{width: width*0.32, height: height*0.15, alignContent: "center", alignItems: "center", justifyContent: "center"}}> 
                            <Image source={require('../../assets/img/profile.png')} resizeMode={"center"}/>
                        </View>
                        <View style={{paddingTop: 20, height: height*0.03}}>
                            <Text style={{fontSize: 15, letterSpacing: 3}}>
                                {userStore.usuario.nome!}
                            </Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "column", width: width*0.85, justifyContent: "space-evenly", paddingTop: 30, alignContent: "center", height: height *0.35}}>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 12, letterSpacing: 3}}>
                                EMAIL:
                            </Text>
                            <Text style={{fontSize: 12, letterSpacing: 3}}>
                                {userStore.usuario.email!}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 12, letterSpacing: 3}}>
                                CPF:
                            </Text>
                            <Text style={{fontSize: 12, letterSpacing: 3}}>
                                {userStore.usuario.cpf!}
                            </Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 12, letterSpacing: 3}}>
                                TELEFONE:
                            </Text>
                            <Text style={{fontSize: 12, letterSpacing: 3}}>
                                {userStore.usuario.celular!}
                            </Text>
                        </View>
                    </View>
                    <View style={{width: width*0.85, height: height*0.1, flexDirection: "row", justifyContent: "space-around", paddingTop: 25}}>
                        <TouchableHighlight 
                            style={{width: width*0.3, height: height*0.05, alignContent: "center", justifyContent: "center", alignItems: 'center', backgroundColor: "#000000", borderRadius: 10}} 
                            onPress={() => handleLogout()}
                        >
                            <Text style={{color: '#FFFFFF', letterSpacing: 2}}>
                                Logout
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}))

export default Perfil;