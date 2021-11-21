import fsDB from '../db/fs-acess'
import { MessageEntity } from '../interfaces/MessageStore';
import Usuario from '../models/Usuario';

class UsuarioRepository {
    static readonly modelName = 'usuario'
    async login(key: string, data: any) {
        const result = fsDB.read(UsuarioRepository.modelName);

        return result;
    }

    async cadastrar(data: any) {
        const result = fsDB.save(this.buildMessage(data));

        return result;
    }

    private buildMessage(data: any) {
        return {
            modelName: UsuarioRepository.modelName,
            data
        }
    }
}

export default new UsuarioRepository();
