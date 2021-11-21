import Usuario from './Usuario';
import Vantagem from './Vantagem';

export default class Empresa extends Usuario {
    private cnpj: string;
    private vantagens: Vantagem[];

    constructor(
        cnpj: string,
        nome: string,
        senha: string,
        vantagens: Vantagem[] = [],
    ) {
        super(nome, senha);
        this.cnpj = cnpj;
        this.vantagens = vantagens;
    }

    static fromJSON(json: string) {
        const data = JSON.parse(json);
        const empresa = new Empresa(
            data.cnpj,
            data.nome,
            data.senha,
            data.vantagens,
        );

        return empresa;
    }

    get JSON() {
        return JSON.stringify({
            cnpj: this.cnpj,
            nome: this.nome,
            senha: this.senha,
            vantagens: this.vantagens,
        });
    }
}
