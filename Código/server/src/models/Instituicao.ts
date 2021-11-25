import prisma from '../db';

export default class Instituicao {
    async getById(id: string) {
        return prisma.instituicao.findFirst({ where: { id } });
    }

    async listarInstituicaos() {
        return prisma.instituicao.findMany({
            include: { alunos: true, cursos: true, departamentos: true},
        });
    }
}
