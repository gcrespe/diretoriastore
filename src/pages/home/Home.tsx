import React, {useEffect} from 'react';
import { View, Text, Dimensions, Image } from 'react-native';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react'
import { Stores } from '../../stores/stores';
import  MenuComponent  from '../../components/menu/menu'

const { width, height } = Dimensions.get('screen');

interface HomeProps{
    navigation: any;
    store: typeof Stores;
}

const Home = inject('store')(observer((props: HomeProps) => {

    const {produtosStore} = Stores;
    const {navigation} = props;

    useEffect(() => {
        // while(!produtosStore.produtos){
        //     produtosStore.getProducts();
        //     console.log(produtosStore.produtos)
        // }
        // produtosStore.setCarregado(true);
    }, [])

    const renderItem = ({item}: any) => {
        return (
            <View style={{margin: 12}}>
                <TouchableOpacity 
                    style={{borderWidth: 0.2, width: width*0.385, height: height*0.26, borderRadius: 5, zIndex: 30}} 
                    onPress={() => navigation.navigate('Produto', {
                        item: item,
                    })}
                >
                    <View style={{height: height*0.26, justifyContent: "space-between", flexDirection: "column"}}>
                        <View 
                            style={{width: width*0.385, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: height*0.04, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: '#000000'}}>
                                {item.nome}
                            </Text>
                        </View>
                        <View 
                            style={{width: width*0.385, backgroundColor: "#000000", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, height: height*0.04, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: '#FFFFFF'}}>
                                R${item.preco}
                            </Text>
                        </View>
                        
                    </View>
                    <View style={{width: 50, height: 50, alignContent: "center", justifyContent: "center", alignItems: 'center', zIndex: 1}}>
                            <Image source={require('../../assets/img/shopping.png')} resizeMode={"center"} style={{width: width*0.3, marginBottom: height*0.33, marginLeft: width*0.255}}/>
                        </View>
                </TouchableOpacity>
            </View>
        )
    } 
    
    return (
        <>
            <View style={{backgroundColor: "#FFFFFF", height: height}}>
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
                    <Text style={{paddingTop: 30, letterSpacing: 5, fontSize: 12}}>
                        Home
                    </Text>
                </View>
                <View style={{paddingLeft: '6%', paddingTop: 20}}>
                    <FlatList    
                        renderItem={renderItem}
                        data={produtosStore.produtos}
                        numColumns={2}
                    />
                    
                </View>    
            </View>
        </>
    )
}))

export default Home;