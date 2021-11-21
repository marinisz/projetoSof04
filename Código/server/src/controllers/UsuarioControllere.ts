import { RequestHandler } from "express";
import UsuarioRepo from '../repository/UsuarioRepository';

export const cadastrar: RequestHandler = (req, res, next) => {
    try {
        const result = UsuarioRepo.cadastrar(req.body);

        return result;
    } catch (error) {
        next(error);
    }
}

export const login: RequestHandler = (req, res, next) => {
    try {
        const result = UsuarioRepo.login(req.params.cnpj, req.body);

        return result;
    } catch (error) {
        next(error);
    }
}

export default {
    cadastrar,
    login
}
