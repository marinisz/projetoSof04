import { RequestHandler } from 'express';
import EmpresaModel from '../models/Empresa';
import AlunoModel from '../models/Aluno';

const Aluno = new AlunoModel();
const Empresa = new EmpresaModel();

export const cadastrar: RequestHandler = async (req, res, next) => {
    try {
        let result: any;
        if (req.body.cnpj) {
            result = await Empresa.cadastrar(req.body);
        } else result = await Aluno.cadastrar(req.body);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        let result: any;
        if (req.body.cnpj) {
            result = await Empresa.login('', req.body);
        } else result = await Aluno.login('', req.body);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export default {
    cadastrar,
    login,
};
