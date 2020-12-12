import UsuarioStore from './usuario/UsuarioStore'
import {ProdutosStore} from './produtos/ProdutosStore'
import CarrinhoStore from './carrinho/CarrinhoStore'

export const Stores = {
    userStore: new UsuarioStore(),
    produtosStore: new ProdutosStore(),
    carrinhoStore: new CarrinhoStore(),
}
