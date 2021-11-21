import fsDB from '../db/fs-acess'

class EmpresaRepository {
    async cadastrarVantagem(key: string, data: any) {
        const result = fsDB.save(data);

        return result;
    }

    async deletarVantagem(query: { cnpj: string; vid: string }, data: any) {
        const result = fsDB.save(data);

        return result;
    }

    async alterarVantagem(key: any) {
        const result = fsDB.save(key);

        return result;
    }
}

export default new EmpresaRepository();
