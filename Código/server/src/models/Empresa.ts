import Usuario from './Usuario';
import Vantagem from './Vantagem';

import prisma from '../db';
import { Prisma } from '.prisma/client';

const vantagem = new Vantagem();

export default class Empresa extends Usuario {
    getById(id: string) {
        return prisma.empresa.findFirst({ where: { id } });
    }
    async atualizarEmpresa(id: string, data: Prisma.EmpresaUpdateInput) {
        return prisma.empresa.update({ where: { id }, data });
    }
    async deletarEmpresa(id: string) {
        return prisma.empresa.delete({ where: { id } });
    }
    async cadastrar(data: any) {
        return prisma.empresa.create({ data });
    }

    async cadastrarVantagem(id: string, data: Prisma.VantagemCreateInput) {
        const result = await vantagem.criarVantagem({
            data: { ...data, empresa: { connect: { id } } },
            include: { empresa: true },
        });

        await prisma.cupom.create({ data: { vantagem: { connect: { id: result.id } } } });

        return result;
    }

    async deletarVantagem(id: string) {
        const result = await vantagem.deletarVantagem(id);

        return result;
    }

    async alterarVantagem(id: string, data: Prisma.VantagemUncheckedUpdateInput) {
        const result = await vantagem.atualizarVantagem({ where: { id }, data });

        return result;
    }

    async listarEmpresas() {
        return prisma.empresa.findMany({
            include: { vantagens: { include: { cupons: { select: { codigo: true } } } } },
        });
    }
}
