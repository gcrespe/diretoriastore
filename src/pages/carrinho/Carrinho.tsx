import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import MenuComponent from '../../components/menu/menu';
import { Stores } from '../../stores/stores';
import { inject, observer } from 'mobx-react'
import { FlatList } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

interface CarrinhoProps{
    navigation: any;
    store: typeof Stores;
}


const Carrinho = inject('store')(observer((props: CarrinhoProps) => {

    const {navigation} = props;
    const { carrinhoStore } = Stores;
    const [render, setRender] = React.useState<boolean>(false);

    const aumentaQuantidade = (id: number) => {
        carrinhoStore.produtosCarrinho.forEach((element) => {
            if(element.produto.id == id){
                element.quantidade++;
            }
        })
        render;
        setRender(!render)
    }

    const diminuiQuantidade = (id: number) => {
        carrinhoStore.produtosCarrinho.forEach((element) => {
            if(element.produto.id == id){
                element.quantidade--;
            }
        })
        render;
        setRender(!render)
    }

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

    const renderProdutoCarrinho = ({item}: any) => {

        return(
            <View style={{width: width*0.9, height: height*0.1, borderWidth: 0.3, borderColor: 'b0b0b0', borderRadius: 7, flexDirection: 'row', marginVertical: 10}}>
                <View style={{width: '20%', height: '100%', padding: 7, marginLeft: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image source={require('../../assets/img/shopping.png')} resizeMode={'center'} style={{width: 60, height: 60}}/>
                </View>
                <View style={{width: '80%', height: '100%', padding: 7, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'space-evenly', paddingLeft: 10}}>
                        <Text>
                            {item.produto.nome}
                        </Text>
                        <Text>
                            {item.produto.id_categoria}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'space-evenly', alignContent: 'flex-end', marginLeft: 50}}>
                        <Text style={{textAlign: 'right'}}>
                            R$ {item.produto.preco * item.quantidade}
                        </Text>
                        <Text style={{textAlign: 'right'}}>
                            Qtd: {item.quantidade}
                        </Text>
                    </View>
                    <View style={{width: '10%', height: 70, justifyContent: 'space-evenly', marginRight: 10, marginTop: -3}}>
                        <TouchableOpacity style={{borderWidth: 0.3, borderColor: 'b0b0b0', borderRadius: 7, width: 25, height: 25, justifyContent: 'center'}} onPress={() => aumentaQuantidade(item.produto.id)}>
                            <Text style={{fontSize: 15, textAlign: 'center'}}>
                                +
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderWidth: 0.3, borderColor: 'b0b0b0', borderRadius: 7, width: 25, height: 25, justifyContent: 'center'}} onPress={() => diminuiQuantidade(item.produto.id)}>
                            <Text style={{fontSize: 25, textAlign: 'center'}}>
                                -
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const carrinhoComProdutos = () => {
        return (
            <>
                <View style={{width: width, height: height*0.73, alignContent: "center", alignItems: 'center', flexDirection: "column"}}>
                    <FlatList
                        data={carrinhoStore.produtosCarrinho}
                        renderItem={renderProdutoCarrinho}
                        numColumns={1}
                    />
                    <View style={{width: width, height: height*0.1, position: 'absolute', bottom: 0, backgroundColor: '#ffffff', alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{width: '50%', height: '55%', borderWidth: 1, borderColor: '#b0b0b0', borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}}>
                            <Text style={{textAlign: 'center'}}>
                                Concluir pedido
                            </Text>
                        </TouchableOpacity>
                    </View>
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
                {console.log(carrinhoStore.produtosCarrinho.length)}
                {
                    
                    carrinhoStore.produtosCarrinho.length == 0
                    
                        ? carrinhoVazio()
                        : carrinhoComProdutos()

                }
               
            </View>
        </>
    )
}))

export default Carrinho;