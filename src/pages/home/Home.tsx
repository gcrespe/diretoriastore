import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, Image, Animated, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react'
import { Stores } from '../../stores/stores';
import  MenuComponent  from '../../components/menu/menu'
import { ProdutoDTO } from '../../stores/produtos/ProdutosStore';

const { width, height } = Dimensions.get('screen');

interface HomeProps{
    navigation: any;
    store: typeof Stores;
}

const Home = inject('store')(observer((props: HomeProps) => {

    const {produtosStore} = Stores;
    const {navigation} = props;

    const [touched, setTouched] = useState<boolean>(false);
    const [checkCamiseta, setCheckCamiseta] = useState<boolean>(false);
    const [checkCalca, setCheckCalca] = useState<boolean>(false);
    const [checkTenis, setCheckTenis] = useState<boolean>(false);
    const [checkUnderwear, setCheckUnderear] = useState<boolean>(false);
    const [render, setRender] = useState<boolean>(false);
    const [valorMin, setValorMin] = useState<string>('');
    const [valorMax, setValorMax] = useState<string>('');

    let produtoFiltrado: ProdutoDTO[] = [];

    const animatedController = useRef(new Animated.Value(0)).current;

    const filterHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [-350, 0],
    });
    
    const toggleListItem = () => {
        if (touched) {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 0,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 1,
                useNativeDriver: false,
            }).start();
        }
        setTouched(!touched)
    };

    const doFilter = () => {

        let camisetas: ProdutoDTO[] = [];
        let tenis: ProdutoDTO[] = [];
        let calcas: ProdutoDTO[] = [];
        let underwear: ProdutoDTO[] = [];


        if(checkCamiseta){
            camisetas = produtosStore.produtosTodos.filter((element) => {
                if(valorMax != ''){
                    console.log(valorMax)
                    const valor = Number(valorMax)
                    produtoFiltrado = produtosStore.produtosTodos.filter((element) => {
                        return Number(element.preco!) <= valor;
                    })
                }
                return element.id_categoria === 0;
                
            })
        }
        if(checkTenis){
            tenis = produtosStore.produtosTodos.filter((element) => {
                return element.id_categoria === 1;
            })
        }
        if(checkCalca){
            calcas = produtosStore.produtosTodos.filter((element) => {
                return element.id_categoria === 2;
            })
        }
        if(checkUnderwear){
            underwear = produtosStore.produtosTodos.filter((element) => {
                return element.id_categoria === 3;
            })
        }
        

        produtoFiltrado = camisetas.concat(tenis, calcas, underwear);

        

        if(valorMin != ''){
            const valor = Number(valorMin)
            produtoFiltrado = produtosStore.produtosTodos.filter((element) => {
                return Number(element.preco!) >= valor;
            })
        }
        

        produtosStore.produtos = produtoFiltrado;

    }

    useEffect(() => {
        produtosStore.getProducts();
        
        setRender(!render);

        produtosStore.setCarregado(true);
    }, [])

    const renderItem = ({item}: any) => {

        const itemReal: ProdutoDTO = item;
        
        return (
            <View style={{margin: 12}}>
                <TouchableOpacity 
                    style={{borderWidth: 0.2, width: width*0.385, height: height*0.26, borderRadius: 5, zIndex: 30}} 
                    onPress={() => navigation.navigate('Produto', {
                        item: itemReal,
                    })}
                >
                    <View style={{height: height*0.26, justifyContent: "space-between", flexDirection: "column"}}>
                        <View 
                            style={{width: width*0.385, borderTopLeftRadius: 10, borderTopRightRadius: 10, height: height*0.04, alignItems: "center", justifyContent: "center"}}>
                            <Text style={{color: '#000000', fontSize: 12}}>
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
                    <Text style={{paddingTop: 20, letterSpacing: 5, fontSize: 12}}>
                        Home
                    </Text>
                </View>
                <View style={{paddingLeft: '6%', paddingTop: 20, height: height*2}}>
                    <FlatList    
                        renderItem={renderItem}
                        data={produtoFiltrado.length === 0 ? produtosStore.produtos : produtoFiltrado}
                        numColumns={2}
                        style={{height: height*2}}
                    />
                    <View style={{height: height}}>

                    </View>
                </View>
                <Animated.View style={{width: width, height: height*0.6, position: 'absolute', bottom: filterHeight, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#b0b0b0'}}>
                    <View style={{height: '15%', width: '100%'}}>
                        <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={() => toggleListItem()}>
                            <Text style={{textAlign: 'center', paddingTop: '4%'}}>
                                Escolher filtros
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: '70%', width: '100%', flexDirection: 'row'}}>
                        <View style={{height: '100%', width: '50%', justifyContent: 'space-evenly'}}>
                            <Text style={{alignSelf: 'center'}}>
                                Categorias
                            </Text>
                            <View style={{height: '20%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'row', alignContent: 'center', marginTop: 20}}>
                                <View style={{width: '20%'}}>
                                    <CheckBox
                                        disabled={false}
                                        value={checkCamiseta}
                                        onValueChange={(newValue) => setCheckCamiseta(newValue)}
                                    />
                                </View>
                                <View style={{width: '40%'}}>
                                    <Text style={{marginTop: 5}}>
                                        Camisetas
                                    </Text>
                                </View>
                            </View>
                            <View style={{height: '20%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'row', alignContent: 'center'}}>
                                <View style={{width: '20%'}}>
                                    <CheckBox
                                        disabled={false}
                                        value={checkTenis}
                                        onValueChange={(newValue) => setCheckTenis(newValue)}
                                    />
                                </View>
                                <View style={{width: '40%'}}>
                                    <Text style={{marginTop: 5}}>
                                        Tênis
                                    </Text>
                                </View>
                            </View>
                            <View style={{height: '20%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'row', alignContent: 'center'}}>
                                <View style={{width: '20%'}}>
                                    <CheckBox
                                        disabled={false}
                                        value={checkCalca}
                                        onValueChange={(newValue) => setCheckCalca(newValue)}
                                    />
                                </View>
                                <View style={{width: '40%'}}>
                                    <Text style={{marginTop: 5}}>
                                        Calças
                                    </Text>
                                </View>
                            </View>
                            <View style={{height: '20%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'row', alignContent: 'center'}}>
                                <View style={{width: '20%'}}>
                                    <CheckBox
                                        disabled={false}
                                        value={checkUnderwear}
                                        onValueChange={(newValue) => setCheckUnderear(newValue)}
                                    />
                                </View>
                                <View style={{width: '40%'}}>
                                    <Text style={{marginTop: 5}}>
                                        Underwear
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={{height: '100%', width: '50%', justifyContent: 'space-evenly'}}>
                            <Text style={{alignSelf: 'center'}}>
                                Valores
                            </Text>
                            <View style={{height: '20%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'column', alignContent: 'center', marginTop: 20, marginLeft: 20}}>
                                <Text style={{padding: 10, fontSize: 12}}>
                                    Valor mínimo
                                </Text>
                                <TextInput style={{width: '80%', height: '10%', borderBottomColor: '#b0b0b0', borderBottomWidth: 1, color: '#000000', textDecorationColor: '#000000'}} onChangeText={(valor) => setValorMin(valor)}/>
                            </View>
                            <View style={{height: '20%', width: '100%', justifyContent: 'space-evenly', flexDirection: 'column', alignContent: 'center', marginTop: 20, marginLeft: 20}}>
                                <Text style={{padding: 10, fontSize: 12}}>
                                    Valor máximo
                                </Text>
                                <TextInput style={{width: '80%', height: '10%', borderBottomColor: '#b0b0b0', borderBottomWidth: 1, color: '#000000'}} onChangeText={(valor) => setValorMax(valor)}/>
                            </View>
                            <View style={{height: '10%'}}>

                            </View>
                            <View style={{height: '30%', justifyContent: 'center', alignContent: 'center'}}>
                                <TouchableOpacity style={{width: '80%', height: '60%', borderWidth: 1, borderColor: '#b0b0b0', borderRadius: 5, marginLeft: 23, marginTop: 15}} onPress={() => doFilter()}>
                                    <Text style={{alignSelf: 'center', marginTop: '6%', color: '#b0b0b0'}}>
                                        Pesquisar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>  
                    </View>
                </Animated.View>    
            </View>
        </>
    )
}))

export default Home;