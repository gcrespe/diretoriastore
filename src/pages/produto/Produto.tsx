import React from 'react';
import { View, Text, Dimensions, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-styled-toast'
import MenuComponent from '../../components/menu/menu';
const { width, height } = Dimensions.get('screen');

interface ProdutoProps{
    navigation: any;
    route: any;
}

const Produto = (props: ProdutoProps) => {

    const {item} = props.route.params;
    const {toast}  = useToast();
    const {navigation} = props;
    
    return (
        <>
            <View style={{backgroundColor: "#FFFFFF", height: height, alignContent: "center", alignItems: 'center'}}>
                <View style={{height: height*0.25}}>
                    <View style={{width: width*0.5, height: height*0.15, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                        <View style={{width: width*0.95, flexDirection: "row", justifyContent: 'space-evenly', marginRight: '35%', marginTop: '10%'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Image source={require('../../assets/img/arrow-icon.png')} style={{tintColor: '#000000', width: 30, height: 30}} resizeMode={"center"}/>
                            </TouchableOpacity>
                            <Text style={{paddingTop: 5, letterSpacing: 5, marginHorizontal: 20}}>
                                DIRETORIA STORE
                            </Text>
                        </View>
                    <View style={{borderBottomWidth: 0.2, width: width*0.85, paddingTop: 20}}/>
                        <Text style={{paddingTop: 20, letterSpacing: 5, fontSize: 12}}>
                            {item.nome} - R${item.preco}
                        </Text>
                    </View>
                </View>
                <View style={{width: width, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <View style={{width: width*0.32, height: height*0.25, alignContent: "center", alignItems: "center", justifyContent: "center"}}> 
                        <Image source={require('../../assets/img/shopping.png')} resizeMode={"center"} style={{width: width*0.7, height: height*0.7}}/>
                    </View>
                </View>
                <View style={{width: width, alignContent: "center", justifyContent: "center", alignItems: 'center', marginTop: height*0.05, marginBottom: height*0.03}}>
                    <Text style={{paddingTop: 20, letterSpacing: 5}}>
                        DESCRIÇÃO
                    </Text>
                </View>
                <View style={{width: width*0.9, alignContent: "center", justifyContent: "center", alignItems: 'center', marginTop: -height*0.03}}>
                    <Text style={{paddingTop: 20}}>
                        {item.descricao}
                    </Text>
                </View>
                <View style={{width: width, alignContent: "center", justifyContent: "center", alignItems: 'center', height: height*0.1}}>
                    <TouchableHighlight
                        style={{width: width*0.6, height: height*0.06, alignContent: "center", justifyContent: "center", alignItems: 'center', backgroundColor: "#000000", borderRadius: 10}} 
                        onPress={() => {toast({
                            message: `${item.nome} adicionado ao carrinho` ,
                            color: "#000000"
                        })}}>
                        <Text style={{color: '#FFFFFF'}}>
                            Adicionar ao carrinho
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </>
    )
}

export default Produto;