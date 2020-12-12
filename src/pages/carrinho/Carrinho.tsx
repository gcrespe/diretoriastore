import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MenuComponent from '../../components/menu/menu';
import { Stores } from '../../stores/stores';
import { inject, observer } from 'mobx-react'
const { width, height } = Dimensions.get('screen');

interface CarrinhoProps{
    navigation: any;
    store: typeof Stores;
}


const Carrinho = inject('store')(observer((props: CarrinhoProps) => {

    const {navigation} = props;
    const { carrinhoStore } = Stores;

    const carrinhoVazio = () => {
        return (
            <>
                <View style={{width: width, height: height*0.55, alignContent: "center", justifyContent: "center", alignItems: 'center', flexDirection: "column"}}>
                    <Image 
                        source={require('../../assets/img/cartempty.png')}
                        resizeMode={"center"}
                    />
                </View>
                <View style={{width: width, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <Text style={{color: "#000000", fontSize: 16}}>
                        Ainda não tem nada por aqui...
                    </Text>
                </View>
            </>
        )
    }

    const carrinhoComProdutos = () => {
        return (
            <>
                <View style={{width: width, height: height*0.55, alignContent: "center", justifyContent: "center", alignItems: 'center', flexDirection: "column"}}>
                   
                </View>
            </>
        )
    }

    return (
        <>
            <View style={{backgroundColor: "#FFFFFF", height: height}}>
                <View style={{width: width, height: height*0.17, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <View style={{width: width, flexDirection: "row", justifyContent: 'space-evenly', marginBottom: -10, zIndex: 2}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Carrinho')} disabled={true}>
                            <Image source={require('../../assets/img/cart-icon.png')} style={{tintColor: '#b0b0b0'}} resizeMode={"center"}/>
                        </TouchableOpacity>
                        <Text style={{paddingTop: 20, letterSpacing: 5, marginHorizontal: 20}}>
                            DIRETORIA STORE
                        </Text>
                        <MenuComponent navigation={navigation}/>
                    </View>
                    
                    <View style={{borderBottomWidth: 0.2, width: width*0.85, paddingTop: 20}}/>
                    <Text style={{paddingTop: 20, letterSpacing: 5, fontSize: 12}}>
                        Carrinho
                    </Text>
                </View>
                {
                    carrinhoStore.produtosCarrinho.length === 0 
                    
                        ? carrinhoVazio()
                        : carrinhoComProdutos()

                }
               
            </View>
        </>
    )
}))

export default Carrinho;