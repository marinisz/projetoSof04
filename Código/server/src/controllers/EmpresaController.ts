import { RequestHandler } from 'express';
import EmpresaRepo from '../repository/EmpresaRepository';

const listarEmpresas: RequestHandler = async (req, res, next) => {
    try {
        const result = await EmpresaRepo.listarEmpresas();

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const getEmpresaById: RequestHandler = async (req, res, next) => {
    try {
        const result = await EmpresaRepo.getById(req.params.id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const atualizarEmpresa: RequestHandler = async (req, res, next) => {
    try {
        const result = await EmpresaRepo.atualizarEmpresa(req.params.id, req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


const deletarEmpresa: RequestHandler = async (req, res, next) => {
    try {
        const result = await EmpresaRepo.deletarEmpresa(req.params.id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


const cadastrarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = await EmpresaRepo.cadastrarVantagem(req.params.cnpj, req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const alterarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = EmpresaRepo.alterarVantagem(req.params.id, req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const deletarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = EmpresaRepo.deletarVantagem(req.params.id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


export default {
    cadastrarVantagem,
    alterarVantagem,
    deletarVantagem,
    listarEmpresas,
    atualizarEmpresa,
    deletarEmpresa,
    getEmpresaById
};
