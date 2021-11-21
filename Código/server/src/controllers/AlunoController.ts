import { RequestHandler } from 'express';
import AlunoRepo from '../repository/AlunoRepository';

const solicitarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = AlunoRepo.solicitarVantagem(req.params.cnpj);

        return result;
    } catch (error) {
        next(error);
    }
};

const consultarSaldo: RequestHandler = async (req, res, next) => {
    try {
        const result = AlunoRepo.consultarSaldo(req.params.cpf);

        return result;
    } catch (error) {
        next(error);
    }
};

export default {
    solicitarVantagem,
    consultarSaldo,
};
