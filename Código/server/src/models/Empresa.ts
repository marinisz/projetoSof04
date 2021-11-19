import { IModel } from '../interfaces/IModel';
import Usuario, { IUsuario } from './Usuario';

interface IEmpresa extends IUsuario {
    cnpj: string;
    vantagens: Vantagem[];
}

const empresas: IEmpresa[] = [];

class Vantagem {
    private cupons: Cupom[] = [];
    constructor(private nome: string, private descricao: string, cupom: Cupom) {
        this.cupons.push(cupom);
    }

    toString() {
        return JSON.stringify({
            cupons: this.cupons,
        });
    }
}

class Cupom {
    constructor(private codigo: string) {}

    toString() {
        codigo: this.codigo;
    }
}

export default class Empresa extends Usuario {
    private vantagens: Vantagem[];

    constructor(protected nome: string, protected senha: string, private cnpj: string) {
        super(nome, senha);
        this.vantagens = [];
    }

    update(cnpj: string, data: Partial<IEmpresa>) {
        const result = empresas.findIndex(empresa => empresa.cnpj === cnpj);

        if (result >= 0) {
            return (empresas[result] = { ...empresas[result], ...data });
        }
    }

    create(data: IEmpresa) {
        const result = empresas.some(empresa => empresa.cnpj === data.cnpj);

        if (!result) empresas.push(data);

        return data;
    }

    read(cnpj: string) {
        const result = empresas.find(empresa => empresa.cnpj === cnpj);
        if (!result) throw new Error(`Empresa, com o ${cnpj}, não existe`);
        return result;
    }

    delete(cnpj: string) {
        const result = empresas.findIndex(empresa => empresa.cnpj === cnpj);
        if (empresas[result]) {
            delete empresas[result];
        } else throw new Error(`Empresa, com o ${cnpj}, não existe`);
    }

    get JSON() {
        return JSON.stringify({
            nome: this.nome,
            cnpj: this.cnpj,
            vantagens: this.vantagens,
        });
    }
}
