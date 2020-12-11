import React from 'react';
import { View, Text, Dimensions, TouchableHighlight, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { inject, observer } from 'mobx-react'
import {Stores} from '../../stores/stores'
import { useToast } from 'react-native-styled-toast'

const { width, height } = Dimensions.get('screen');

interface LoginProps{
    navigation: any;
    store: typeof Stores;
}

const Login = inject('store')(observer((props: LoginProps)  => {

    const [email, setEmail] = React.useState<string>('');
    const [senha, setSenha] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const {navigation} = props;
    const {userStore} = Stores;
    const {produtosStore} = Stores;

    const {toast}  = useToast();

    async function handleLogin(){
        setLoading(true);
        try{ 
            await userStore.auth(email, senha);
            await produtosStore.getProducts();
        }catch(e){
            throw e;
        }finally{
            setLoading(false);
            if(userStore.id != -1){
                navigation.navigate('Home');
                toast({
                    message: 'Login realizado!'
                })
            }else{
                toast({
                    message: 'O login ou a senha estão incorretos',
                    accentColor: 'red',
                    iconColor: 'red',
                    iconFamily: "FontAwesome",
                })
            }
        }
        
    }

    return (
        <KeyboardAvoidingView behavior={"position"}>
            <View style={{backgroundColor: "#FFFFFF", height: height}}>
                <View style={{width: width, height: height*0.4, alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                        <Text style={{paddingTop: 20, letterSpacing: 5}}>
                            DIRETORIA STORE
                        </Text>
                        <View style={{borderBottomWidth: 0.2, width: width*0.85, paddingTop: 20}}/>
                        <Text style={{paddingTop: 20, letterSpacing: 5, fontSize: 12}}>
                            CLOTHING
                        </Text>
                    </View>
                <View style={{width: width, height: height*0.30, alignContent: "center", justifyContent: "space-evenly", alignItems: "center"}}>
                    <View>
                        <Text style={{letterSpacing: 3}}>
                            LOGIN:
                        </Text>
                        <TextInput placeholder={'login'} style={{borderBottomWidth: 0.5, width: width*0.8}} onChangeText={(email) => setEmail(email)}/>
                    </View>
                    <View>
                        <Text style={{letterSpacing: 3}}>
                            SENHA:
                        </Text>
                        <TextInput placeholder={'senha'} secureTextEntry={true} style={{borderBottomWidth: 0.5, width: width*0.8}} onChangeText={(senha) => setSenha(senha)}/>
                    </View>
                </View>
                <View style={{alignContent: "center", justifyContent: "center", alignItems: 'center'}}>
                    <TouchableHighlight 
                        disabled={loading}
                        style={{width: width*0.6, height: height*0.06, alignContent: "center", justifyContent: "center", alignItems: 'center', backgroundColor: "#000000", borderRadius: 10}} 
                        onPress={() => handleLogin()}>
                        
                        <Text style={{color: '#FFFFFF'}}>
                            Login
                        </Text>
                    </TouchableHighlight>
                    <View style={{paddingTop: 20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                            <Text> 
                                Cadastre-se
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}))

export default Login;