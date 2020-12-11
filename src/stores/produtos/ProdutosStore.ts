import { observable, action, computed } from "mobx";
import api from '../../services/api/api'


export interface ProdutoDTO{
    nome?: string,
    descricao?: string,
    preco?: string,
    estoque?: number,
}

export class ProdutosStore {

    @observable produtos: ProdutoDTO[] = [
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
        {
            descricao: 'asdadssad',
            estoque: 10,
            nome: 'Produto 1',
            preco: '100',
        },
    ];
    @observable carregado: boolean = false;

    @action.bound 
    async getProducts(){
        
        await api.get(`/produtos`)
            .then((res) => {
                this.produtos = res.data;
            })
            .catch((e) => {
                throw e;
            })
            .finally(() => {
                this.setCarregado(true);
            } )
    }

    @computed
    setCarregado(carregado: boolean){
        this.carregado = carregado;
    }

}