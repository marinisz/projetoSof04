import fsDB from '../db/fs-acess'
import { MessageEntity } from '../interfaces/MessageStore';
import Empresa from '../models/Empresa';

class EmpresaRepository {
    async cadastrarVantagem(key: string, data: any) {
        const result = fsDB.save(data);

        return result;
    }

    async deletarVantagem(query: { cnpj: string; vid: string }) {
        const result = fsDB.read(2 as any);

        return result;
    }

    async alterarVantagem(query: { cnpj: string; vid: string }, data: any) {
        const json = await fsDB.read(this.buildMessage(data))
        const empresa = Empresa.fromJSON(json)
        const result = fsDB.save(this.buildMessage(Empresa));

        return result;
    }

    private buildMessage(data: any) {
        return {
            modelName: 'empresa',
            data
        }
    }
}

export default new EmpresaRepository();
