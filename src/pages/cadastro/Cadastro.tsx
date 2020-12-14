import React, { useEffect } from 'react';
import { View, Text, Dimensions, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import { Stores } from '../../stores/stores';
import { useToast } from 'react-native-styled-toast'

const { width, height } = Dimensions.get('screen');


interface CadastroProps{
    navigation: any;
    store: typeof Stores;
}


const Cadastro = (props: CadastroProps) => {

    const [nome, setNome] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [CPF, setCPF] = React.useState<string>('');
    const [celular, setCelular] = React.useState<string>('');
    const [senha, setSenha] = React.useState<string>('');
    const [finished, setFinished] = React.useState<boolean>(false)

    const {userStore} = Stores;
    const {navigation} = props;
    
    const {toast}  = useToast();

    async function handleCadastro(){
        try{ 
            await userStore.addUser(
                email,
                senha,
                celular,
                nome,
                CPF,
            ).then((res) => {
                setFinished(true);
                navigation.navigate('Login');
                toast({
                    message: 'Cadastro realizado!'
                })
            })
        }catch(e){
            if(userStore.error){
                toast({
                    message: 'Ocorreu um erro durante o cadastro, verifique o email inserido',
                    accentColor: 'red',
                    iconColor: 'red',
                    iconFamily: "FontAwesome",
                })
            }
            console.log(e);
            throw e;
        }
    }

    return (
        <KeyboardAvoidingView behavior={'padding'}>
            <View style={{backgroundColor: "#FFFFFF", height: height}}>
                <View style={{width: width, height: height*0.1, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <Text style={{letterSpacing: 3, paddingTop: 40}}>
                        CADASTRE-SE!
                    </Text>
                </View>
                <View style={{width: width, height: height*0.65, alignContent: "center", justifyContent: "space-evenly", alignItems: 'center'}}>
                    <View>
                        <Text style={{letterSpacing: 3}}>
                            NOME:
                        </Text>
                        <TextInput placeholder={'Nome'} style={{borderBottomWidth: 0.5, width: width*0.8}} onChangeText={(text) => setNome(text)}/>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', width: width*0.8}}>
                        <View>
                            <Text style={{letterSpacing: 3}}>
                                EMAIL:
                            </Text>
                            <TextInput placeholder={'Email'} style={{borderBottomWidth: 0.5, width: width*0.45}} onChangeText={(text) => setEmail(text)}/>
                        </View>
                        <View>
                            <Text style={{letterSpacing: 3}}>
                                CPF:
                            </Text>
                            <TextInput placeholder={'CPF'} style={{borderBottomWidth: 0.5, width: width*0.3}} onChangeText={(text) => setCPF(text)}/>
                        </View>
                    </View>
                    
                    <View>
                        <Text style={{letterSpacing: 3}}>
                            CELULAR:
                        </Text>
                        <TextInput placeholder={'Celular'} style={{borderBottomWidth: 0.5, width: width*0.8}} onChangeText={(text) => setCelular(text)}/>
                    </View>
                    <View>
                        <Text style={{letterSpacing: 3}}>
                            SENHA:
                        </Text>
                        <TextInput placeholder={'Senha'} secureTextEntry={true} style={{borderBottomWidth: 0.5, width: width*0.8}} onChangeText={(text) => setSenha(text)} />
                    </View>
                </View>
                <View style={{alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <TouchableHighlight 
                        style={{width: width*0.6, height: height*0.06, alignContent: "center", justifyContent: "center", alignItems: 'center', backgroundColor: "#000000", borderRadius: 10}} 
                        onPress={() => handleCadastro()}
                    >
                        <Text style={{color: '#FFFFFF'}}>
                            Cadastrar
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Cadastro;