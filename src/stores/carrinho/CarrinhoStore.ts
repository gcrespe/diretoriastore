import { observable, action, computed } from "mobx";
import api from '../../services/api/api'
import { ProdutoDTO } from "../produtos/ProdutosStore";

export interface produtoQuantidade{
    produto: ProdutoDTO,
    quantidade: number,
}

export default class CarrinhoStore{

    @observable produtosCarrinho: produtoQuantidade[] = new Array(); 

}