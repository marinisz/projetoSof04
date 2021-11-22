import Usuario from './Usuario';
import prisma from '../db';
import { Prisma } from '.prisma/client';
import Vantagem from './Vantagem';

const vantagem = new Vantagem();

export default class Aluno extends Usuario {
    getById(id: number) {
        return prisma.aluno.findFirst({ where: { id } });
    }
    async atualizarAluno(id: number, data: Prisma.AlunoUpdateInput) {
        return prisma.aluno.update({ where: { id }, data });
    }
    async deletarAluno(id: number) {
        return prisma.aluno.delete({ where: { id } });
    }
    async login(data: any) {
        const usuario = await prisma.aluno.findUnique({ where: { cpf: data.key }, select: { senha: true } });
        const ehAutentico = data.senha === usuario?.senha;

        return ehAutentico;
    }
    async cadastrar(data: Prisma.AlunoCreateInput) {
        return prisma.aluno.create({
            data: {
                ...data,
                instituicao: { connect: { id: data.instituicao as string } },
            },
            include: { instituicao: true, vantagens: true },
        });
    }

    async listarAlunos() {
        return prisma.aluno.findMany({
            include: {
                instituicao: true,
                vantagens: {
                    select: { vantagem: { include: { empresa: true } }, valor: true, createdAt: true, updatedAt: true },
                },
            },
        });
    }

    async solicitarVantagem(aId: number, vId: string) {
        const v = await vantagem.findOne({ where: { id: vId } });
        const a = await prisma.aluno.findFirst({ where: { id: aId } });
        let result = {};
        if (v && a) {
            await prisma.aluno_Vantagem.create({ data: { alunoId: a.id, vantagemId: v.id, valor: v.valor } });
            result = await prisma.aluno.update({
                where: { id: a?.id },
                data: { saldo: this.debaterSaldo(a.saldo, v.valor) },
                include: { vantagens: true },
            });
        }

        return result;
    }

    async consultarSaldo(id: number) {
        const result = prisma.aluno.findFirst({ where: { id }, select: { saldo: true } });

        return result;
    }

    private debaterSaldo(saldo: number, preco: number) {
        return saldo - preco;
    }
}
