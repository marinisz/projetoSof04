import createError from 'http-errors';
import prisma from '../db';
import Aluno from './Aluno';
import Professor_Aluno from './Professor_Aluno';

const prof_aluno = new Professor_Aluno();
const aluno = new Aluno();

export default class Professor {
    getById(id: number) {
        return prisma.professor.findFirst({ where: { id } });
    }

    async listarProfessores() {
        return prisma.professor.findMany({ include: { departamento: { select: { nome: true } } } });
    }

    async enviarMoeda(profId: number, alunoId: number, qtd: number, motivo: string) {
        const a = await aluno.getById(alunoId);
        const p = await prisma.professor.findFirst({ where: { id: profId } });

        if (p && a) {
            const saldo = await prisma.professor.findFirst({ where: { id: profId }, select: { saldo: true } });
            if (saldo?.saldo! < qtd) {
                throw createError(400, 'Não tem moeda suficiente para enviar');
            } else {
                const result = await prof_aluno.criar({ alunoId, professorId: profId, quantidade: qtd, motivo });
                await prisma.professor.update({
                    where: { id: profId },
                    data: { saldo: { decrement: qtd } },
                });
                return result;
            }
        } else Promise.resolve({});
    }

    async consultarSaldo(id: number) {
        return prisma.professor.findFirst({ where: { id }, select: { saldo: true, nome: true } });
    }
}
