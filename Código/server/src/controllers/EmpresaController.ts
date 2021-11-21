import { RequestHandler } from 'express';
import EmpresaRepo from '../repository/EmpresaRepository';

const cadastrarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = EmpresaRepo.cadastrarVantagem(req.params.cnpj, req.body);

        return result;
    } catch (error) {
        next(error);
    }
};

const alterarVantagem: RequestHandler = async (req, res, next) => {
    const query = { cnpj: req.params.cnpj, vid: req.params.vid };
    try {
        const result = EmpresaRepo.alterarVantagem(query, req.body);

        return result;
    } catch (error) {
        next(error);
    }
};

const deletarVantagem: RequestHandler = async (req, res, next) => {
    const query = { cnpj: req.params.cnpj, vid: req.params.vid };
    try {
        const result = EmpresaRepo.deletarVantagem(query);

        return result;
    } catch (error) {
        next(error);
    }
};

export default {
    cadastrarVantagem,
    alterarVantagem,
    deletarVantagem,
};
