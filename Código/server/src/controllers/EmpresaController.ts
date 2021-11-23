import { RequestHandler } from 'express';
import EmpresaModel from '../models/Empresa';

const Empresa  = new EmpresaModel()

const listarEmpresas: RequestHandler = async (req, res, next) => {
    try {
        const result = await Empresa.listarEmpresas();

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const getEmpresaById: RequestHandler = async (req, res, next) => {
    try {
        const result = await Empresa.getById(req.params.id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const atualizarEmpresa: RequestHandler = async (req, res, next) => {
    try {
        const result = await Empresa.atualizarEmpresa(req.params.id, req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


const deletarEmpresa: RequestHandler = async (req, res, next) => {
    try {
        const result = await Empresa.deletarEmpresa(req.params.id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


const cadastrarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = await Empresa.cadastrarVantagem(req.params.cnpj, req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const alterarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = await Empresa.alterarVantagem(req.params.id, req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const deletarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const result = await Empresa.deletarVantagem(req.params.id);

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
