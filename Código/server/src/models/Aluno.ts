import { IModel } from '../interfaces/IModel';

export default class Aluno extends Usuario {
    constructor(
        private nome: string,
        private senha: string,
        private cpf: string,
        private rg: string,
        private endereco: string,
        private instituicao: string,
        private saldo: string,
        private curso: string,
    ) {
        super(nome, senha);
    }

    toString() {
        return JSON.stringify({
            nome: this.nome,
            cpf: this.cpf,
            rg: this.rg,
            endereco: this.endereco,
            instituicao: this.instituicao,
            saldo: this.saldo,
            curso: this.curso,
        });
    }
}
