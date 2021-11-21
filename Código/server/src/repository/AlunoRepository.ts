import prisma from '../db';
import { Prisma } from '.prisma/client';

class AlunoRepository {
    async cadastrar(data: any) {
        return prisma.aluno.create({ data });
    }

    async listarAlunos() {
        return prisma.aluno.findMany({
            include: { instituicao: true},
        });
    }

    async solicitarVantagem(key: string) {
        const result = {}

        return result;
    }

    async consultarSaldo(cpf: string) {
        const result = {}

        return result;
    }
}

export default new AlunoRepository();
