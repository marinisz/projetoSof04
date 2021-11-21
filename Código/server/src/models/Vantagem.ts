import Cupom from "./Cupom";
import crypto from 'crypto';

export default class Vantagem {
    private cupons: Cupom[] = [];
    private _id: string;
    private nome: string;
    private descricao: string;

    constructor(nome: string, descricao: string, cupom: Cupom) {
        this.cupons.push(cupom);
        this.nome = nome;
        this.descricao = descricao;
        this._id = crypto.randomInt(Number.MAX_SAFE_INTEGER).toString();
    }

    get id() {
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }

    get JSON() {
        return JSON.stringify({
            id: this.id,
            cupons: this.cupons,
        });
    }
}
