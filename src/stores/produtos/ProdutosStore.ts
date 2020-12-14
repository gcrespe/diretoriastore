import { observable, action, computed } from "mobx";
import api from '../../services/api/api'


export interface ProdutoDTO{
    id: number,
    nome?: string,
    descricao?: string,
    preco?: string,
    estoque?: number,
    created_at: Date,
    updated_at: Date,
    id_categoria: number,
}

export class ProdutosStore {

    @observable produtos: ProdutoDTO[] = [];
    @observable produtosTodos: ProdutoDTO[] = [];
    @observable carregado: boolean = false;

    @action.bound 
    async getProducts(){
        
        await api.get(`/produtos`)
            .then((res) => {
                this.produtos = res.data;
                this.produtosTodos = res.data;
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