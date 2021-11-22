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
    const data = {
        key: req.body.cnpj || req.body.cpf,
        senha: req.body.senha,
    };
    try {
        let result: any;
        if (data.key.length === 14) {
            result = await Empresa.login(req.body);
        } else if (data.key.length === 11) result = await Aluno.login(req.body);
        else result = { error: { message: 'CPF ou CNPJ tem que ter tamanhos 11 e 14, respectivamente' } };

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export default {
    cadastrar,
    login,
};
