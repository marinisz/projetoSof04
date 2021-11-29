import prisma from '../db';
import Aluno from './Aluno';

const aluno = new Aluno();

export type IProfessor_Aluno = {
    alunoId: number;
    professorId: number;
    quantidade: number;
    motivo: string;
};

export default class Professor_Aluno {
    async criar(data: IProfessor_Aluno) {
        const result = await prisma.professor_Aluno.create({ data });
        await aluno.receberMoeda(result.alunoId, result.quantidade);
        return result;
    }
}
