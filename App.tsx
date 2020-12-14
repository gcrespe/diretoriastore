import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/login/Login'
import Home from './src/pages/home/Home'
import Perfil from './src/pages/perfil/Perfil'
import Cadastro from './src/pages/cadastro/Cadastro'
import Carrinho from './src/pages/carrinho/Carrinho'
import Produto from './src/pages/produto/Produto'
import { Provider } from 'mobx-react';
import {Stores} from './src/stores/stores'
import { ThemeProvider } from 'styled-components'
import { ToastProvider } from 'react-native-styled-toast'

const Stack = createStackNavigator();

const theme = {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  colors: {
    text: '#0A0A0A',
    background: '#FFF',
    border: '#E2E8F0',
    muted: '#F0F1F3',
    success: '#7DBE31',
    error: '#FC0021',
    info: '#00FFFF'
  }
}

class App extends React.Component{
  
  render(){
    return (
      <Provider store={Stores}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false }}/>
                <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
                <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
                <Stack.Screen name="Produto" component={Produto} options={{ headerShown: false }}/>
              </Stack.Navigator>
            </NavigationContainer>
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    );
  }
};
''
export default App;
