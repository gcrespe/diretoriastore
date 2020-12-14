import React, {useEffect} from 'react';
import { View, Text, Dimensions, ScrollView, Image} from 'react-native';
import { inject, observer } from 'mobx-react';
import { Stores } from '../../stores/stores';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MenuComponent from '../../components/menu/menu';

const { width, height } = Dimensions.get('screen');

interface PerfilProps{
    store: typeof Stores;
    navigation: any;
}


const Perfil = inject('store')(observer((props: PerfilProps) => {

    const { userStore, carrinhoStore } = Stores;
    const { navigation } = props;
    const [render, setRender] = React.useState<boolean>(false)

    useEffect(() => {

        carrinhoStore.getPedidos();
        
        setRender(!render);

    }, [])

    const renderProdutoCarrinho = ({item}: any) => {

        return(
            <View style={{width: width*0.9, height: height*0.12, borderWidth: 0.3, borderColor: 'b0b0b0', borderRadius: 7, flexDirection: 'row', marginVertical: 10, marginBottom: 20}}>
                <View style={{width: '100%', height: '100%', padding: 7, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'space-evenly', paddingLeft: 10}}>
                        <Text>
                            Cod. pedido: {item.codigo}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'flex-end', marginLeft: 30}}>
                        <Text style={{textAlign: 'right', paddingRight: 10}}>
                            Feito em: {item.created_at.slice(0,10)}
                        </Text>
                        <Text style={{textAlign: 'right', paddingRight: 10}}>
                            Status: {item.status}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    const pedidos = () => {
        return (
            <>
                <View style={{width: width, alignContent: "center", alignItems: 'center', flexDirection: "column"}}>
                    {carrinhoStore.pedidos.length == 0
                        ?
                            <Text style={{fontSize: 14, alignSelf: 'center', marginTop: 10}}>
                                Nenhum pedido foi realizado ainda.
                            </Text>
                        :
                        <ScrollView> 
                            <FlatList
                            data={carrinhoStore.pedidos}
                            renderItem={renderProdutoCarrinho}
                            numColumns={1}
                            />
                            <View style={{height: height*0.1}}>

                            </View>
                        </ScrollView>

                    }
                    {console.log(carrinhoStore.pedidos)}
                </View>
            </>
        )
    }

    return (
        <>
            <View style={{backgroundColor: "#FFFFFF", height: height}}>
                <ScrollView style={{width: width, height: height, alignContent: "center"}} contentContainerStyle={{justifyContent: "center", alignItems: 'center'}}>
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
                    <View style={{width: width}}>
                        <View style={{width: width, justifyContent: 'center', marginBottom: 20}}>
                            <Text style={{alignSelf: 'center', fontSize: 20, letterSpacing: 2}}>
                                Pedidos
                            </Text>
                        </View>
                        {pedidos()}
                    </View>
                </ScrollView>
            </View>
        </>
    )
}))

export default Perfil;