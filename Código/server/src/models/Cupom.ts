import prisma from '../db';
import { Prisma } from '.prisma/client';

export default class Cupom {
    async deleteMany(opt: Prisma.CupomDeleteManyArgs) {
        const result = await prisma.cupom.deleteMany(opt)

        return result
    }
}
