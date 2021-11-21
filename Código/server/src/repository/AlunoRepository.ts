import fsDB from '../db/fs-acess'
import Aluno from '../models/Aluno';

class AlunoRepository {
    static readonly modelName = 'aluno'
    async solicitarVantagem(key: string) {
        const result = await fsDB.read(AlunoRepository.modelName);

        return result;
    }

    async consultarSaldo(cpf: string) {
        const result = await fsDB.read(AlunoRepository.modelName);

        return result;
    }
}

export default new AlunoRepository();
