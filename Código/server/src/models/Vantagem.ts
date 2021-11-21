import prisma from '../db';
import { Prisma } from '.prisma/client';
import Cupom from './Cupom';

const cupom = new Cupom()
export default class Vantagem {
    async listarVantagens(opt: Prisma.VantagemFindManyArgs) {
        const result = await prisma.vantagem.findMany(opt);

        return result;
    }
    async criarVantagem(opt: Prisma.VantagemCreateArgs) {
        const result = await prisma.vantagem.create(opt);

        return result;
    }
    async deletarVantagem(id: string, opt?: Prisma.VantagemDeleteArgs) {
        const result = await prisma.$transaction([
            prisma.aluno_Vantagem.deleteMany({where: {vantagem: {id}}}),
            prisma.cupom.deleteMany({ where: { vantagem: { id } } }),
            prisma.vantagem.delete({ where: { id } }),
        ]);

        return result;
    }
    async atualizarVantagem(opt: Prisma.VantagemUpdateArgs) {
        const result = await prisma.vantagem.update(opt);

        return result;
    }
    async findOne(args: Prisma.VantagemFindFirstArgs) {
        const result = await prisma.vantagem.findFirst(args);

        return result
    }
}
