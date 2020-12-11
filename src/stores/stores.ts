import UsuarioStore from './usuario/UsuarioStore'
import {ProdutosStore} from './produtos/ProdutosStore'

export const Stores = {
    userStore: new UsuarioStore(),
    produtosStore: new ProdutosStore(),
}
