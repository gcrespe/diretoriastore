import React from 'react';
import { inject, observer } from 'mobx-react'
import { View, Text, Dimensions, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import CarrinhoStore from '../../stores/carrinho/CarrinhoStore';
import { Stores } from '../../stores/stores';
import { useToast } from 'react-native-styled-toast'

const { width, height } = Dimensions.get('screen');

interface ModalProps{
    navigation: any;
    store?: typeof Stores;
}

const ModalComponent = inject('store')(observer((props: ModalProps) => {

    const {carrinhoStore, userStore, produtosStore} = Stores;
 
    const [rua, setRua] = React.useState<string>('');
    const [cidade, setCidade] = React.useState<string>('');
    const [bairro, setBairro] = React.useState<string>('');
    const [nro, setNro] = React.useState<string>('');
    const [cep, setCep] = React.useState<string>('');
    const [estado, setEstado] = React.useState<string>('');
    const [complemento, setComplemento] = React.useState<string>('');

    const {toast}  = useToast();

    let _menu: any;

    const calculaValorTotal = () => {

        let valortotal: number = 0;

        carrinhoStore.produtosCarrinho.forEach((element) => {
            valortotal = valortotal + (Number(element.produto.preco) * element.quantidade)
        })

        return valortotal;
    }

    async function handlePedido(){

        console.log(rua, cidade, bairro, nro, cep, estado, complemento, calculaValorTotal())

        carrinhoStore.enderecoPedido = {
            idUsuario: userStore.id,
            produtos: carrinhoStore.produtosCarrinho,
            valorTotal: calculaValorTotal(),
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            complemento: complemento,
            estado: estado,
            nro: nro,
            rua: rua
        }
        
        await carrinhoStore.consolidaPedido()

        setTimeout(() => {
            if(_menu != null ){
                _menu.hide()
            };
        }, 1000);

        setTimeout(() => {
            toast({
                message: 'Pedido realizado!'
            })
        }, 1000);

        carrinhoStore.produtosCarrinho = [];
        
    }

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

    return (
        <View>
            <Menu
                ref={setMenuRef}
                animationDuration={250}
                button={
                    <View style={{width: width, height: height*0.1, position: 'absolute', bottom: 0, left: -180, backgroundColor: '#ffffff', alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{width: '50%', height: '75%', borderWidth: 1, borderColor: '#b0b0b0', borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}}
                            onPress={showMenu}>
                            <Text style={{textAlign: 'center'}}>
                                Concluir pedido
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
                style={{width: width*0.7, height: height*0.91, alignContent: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: 160, marginTop: '2%'}}
            >
                <View style={{width: '100%', height: height*0.09}}>
                    <Text style={{letterSpacing: 2, alignSelf: 'center', paddingTop: 32}}>
                        Dados da entrega
                    </Text>
                </View>
                <MenuItem style={{width: '100%', maxWidth: width*0.8, justifyContent: 'space-evenly', marginLeft: '2%', marginVertical: 10, alignContent: 'center'}}>
                    <View style={{width: width*0.40, borderBottomColor: '#b0b0b0', borderBottomWidth: 1}}>
                        <TextInput style={{width: width*0.45}} placeholder={'Rua'} onChangeText={(text) => setRua(text)}/>         
                    </View>  
                    <View style={{width: width*0.05}}>

                    </View>
                    <View style={{width: width*0.13, borderBottomColor: '#b0b0b0', borderBottomWidth: 1, marginLeft: 20}}>
                        <TextInput style={{width: width*0.1}} placeholder={'Nro'} onChangeText={(text) => setNro(text)}/>         
                    </View>            
                </MenuItem>
                <MenuItem style={{width: '100%', maxWidth: width*0.8, justifyContent: 'space-evenly', marginLeft: '2%', marginVertical: 20}}>
                    <View style={{width: width*0.15, borderBottomColor: '#b0b0b0', borderBottomWidth: 1, marginLeft: 20}}>
                        <TextInput style={{width: width*0.15}} placeholder={'Cidade'} onChangeText={(text) => setCidade(text)}/>         
                    </View>  
                    <View style={{width: width*0.05}}>

                    </View>
                    <View style={{width: width*0.38, borderBottomColor: '#b0b0b0', borderBottomWidth: 1}}>
                        <TextInput style={{width: width*0.38}} placeholder={'Bairro'} onChangeText={(text) => setBairro(text)}/>         
                    </View>  
                              
                </MenuItem>
                <MenuItem style={{width: '100%', maxWidth: width*0.8, justifyContent: 'space-evenly', marginLeft: '2%', marginVertical: 20}}>
                    <View style={{width: width*0.23, borderBottomColor: '#b0b0b0', borderBottomWidth: 1, marginLeft: 20}}>
                        <TextInput style={{width: width*0.23}} placeholder={'CEP'} onChangeText={(text) => setCep(text)}/>         
                    </View>  
                    <View style={{width: width*0.05}}>

                    </View>
                    <View style={{width: width*0.30, borderBottomColor: '#b0b0b0', borderBottomWidth: 1}}>
                        <TextInput style={{width: width*0.30}} placeholder={'Estado'} onChangeText={(text) => setEstado(text)}/>         
                    </View>  
                              
                </MenuItem>
                <MenuItem style={{width: '100%', maxWidth: width*0.8, justifyContent: 'space-evenly', marginLeft: '2%', marginVertical: 10}}>
                    <View style={{width: width*0.58, borderBottomColor: '#b0b0b0', borderBottomWidth: 1}}>
                        <TextInput style={{width: width*0.58}} placeholder={'Complemento'} onChangeText={(text) => setComplemento(text)}/>         
                    </View>  
                              
                </MenuItem>
                <MenuDivider />  
                <MenuItem style={{width: '100%', maxWidth: '100%'}} onPress={() => handlePedido()}>Concluir pedido</MenuItem>
            </Menu>
        </View>
    );
}))

export default ModalComponent;