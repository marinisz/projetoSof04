import Usuario from './Usuario';

export default class Aluno extends Usuario {
    constructor(
        private cpf: string,
        protected nome: string,
        protected senha: string,
        private rg: string,
        private endereco: string,
        private instituicao: string,
        private saldo: string,
        private curso: string,
    ) {
        super(nome, senha);
    }

    get JSON() {
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

    static fromJSON(json: string) {
        const data = JSON.parse(json);
        const aluno = new Aluno(
            data.cpf,
            data.nome,
            data.senha,
            data.rg,
            data.endereco,
            data.instituicao,
            data.saldo,
            data.curso,
        );

        return aluno;
    }
}
