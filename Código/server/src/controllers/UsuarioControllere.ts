import { RequestHandler } from 'express';
import EmpresaRepo from '../repository/EmpresaRepository';
import AlunoRepo from '../repository/AlunoRepository';
import UsuarioRepo from '../repository/UsuarioRepository';

export const cadastrar: RequestHandler = async (req, res, next) => {
    try {
        let result: any;
        if (req.body.cnpj) {
            result = await EmpresaRepo.cadastrar(req.body);
        } else result = await AlunoRepo.cadastrar(req.body);
        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const result = await UsuarioRepo.login(req.params.cnpj, req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export default {
    cadastrar,
    login,
};
