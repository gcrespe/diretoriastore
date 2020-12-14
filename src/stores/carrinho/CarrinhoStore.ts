import { observable, action, computed } from "mobx";
import api from '../../services/api/api'
import { ProdutoDTO } from "../produtos/ProdutosStore";

export interface produtoQuantidade{
    produto: ProdutoDTO,
    quantidade: number,
}

export interface informacoesEntrega{
    idUsuario: number,
    produtos: produtoQuantidade[],
    valorTotal: number,
    rua: string,
    nro: string,
    cidade: string,
    bairro: string,
    cep: string,
    estado: string, 
    complemento: string
}

export interface Pedidos{
    id: number,
    codigo: number,
    id_usuario: number,
    status: string,
    produtos: produtoQuantidade[],
    valor_total: number,
    entrega_rua: string,
    entrega_nro: string,
    entrega_cidade: string,
    entrega_bairro: string,
    entrega_cep: string,
    entrega_estado: string, 
    entrega_complemento: string,
    created_at: Date,
    updated_at: Date,
}

export default class CarrinhoStore{

    @observable produtosCarrinho: produtoQuantidade[] = new Array(); 
    @observable enderecoPedido: informacoesEntrega = {} as informacoesEntrega;
    @observable resposta: any = {};
    @observable pedidos: Pedidos[] = [];

    @action.bound
    async consolidaPedido(){

        await api.post(`/pedidos`, {
            idUsuario: this.enderecoPedido.idUsuario,
            produtos: this.produtosCarrinho,
            valorTotal: this.enderecoPedido.valorTotal,
            rua: this.enderecoPedido.rua,
            nro: this.enderecoPedido.nro,
            cidade: this.enderecoPedido.cidade,
            bairro: this.enderecoPedido.bairro,
            cep: this.enderecoPedido.cep,
            estado: this.enderecoPedido.estado, 
            complemento: this.enderecoPedido.complemento
        })
            .then((res) => {
                console.log(this.enderecoPedido);
                this.resposta = res.status
            })
            .catch((e) => {
                throw e;
            })

    }

    async getPedidos(){
        await api.get(`/pedidos`)
            .then((res) => {
                this.pedidos = res.data
            })
            .catch((e) => {
                throw e;
            })
    }

}