import { observable, action, computed } from "mobx";
import api from '../../services/api/api'

export interface Usuario{
    nome?: string,
    email?: string,
    senha?: string,
    nivel_acesso?: number,
    celular?: string,
    cpf?: string
}

export interface JWT{
    uid: number;
    iat: number;
    jti: string;
    exp: number
}

class UsuarioStore {

    @observable usuario: Usuario = {} as Usuario;
    @observable token: any;
    @observable id: number = -1 as number;
    @observable status: number = 0 as number;
    
    @computed
    @action async auth(email: string, senha: string){
        
        await api.post(`/auth`, {
            email: email,
            senha: senha,  
        })
            .then((res) => {
                this.token = res.data.token;
                this.usuario = res.data.user;
                this.id = res.data.id;
                this.status = res.status;
            })
            .catch((e) => {
                throw e;
            })
    }
    
    @computed
    @action async addUser(email: string, senha: string, celular: string, nome: string, cpf: string){
        await api.post(`/usuarios`,{
            nome: nome,
            email: email,
            senha: senha,
            nivel_acesso: 1,
            cpf: cpf,
            celular: celular
        })
        .then((res) => {
            this.usuario = res.data;
        })
        .catch((e) => {
            throw e;
        })
    }

    @action reset(){
        this.token = null;
        this.id = -1;
        this.usuario = {};
    }
}

export default UsuarioStore;