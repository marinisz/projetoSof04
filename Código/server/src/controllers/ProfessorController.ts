import { RequestHandler } from 'express';
import ProfessorModel from '../models/Professor';

const Professor = new ProfessorModel();

const enviarMoeda: RequestHandler = async (req, res, next) => {
    debugger
    try {
        const id = Number(req.params.id);
        const { alunoId, quantidade, motivo } = req.body;
        const result = await Professor.enviarMoeda(id, alunoId, quantidade, motivo);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const consultarSaldo: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const result = await Professor.consultarSaldo(id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const getProfessorById: RequestHandler = async (req, res, next) => {
    try {
        const result = await Professor.getById(Number(req.params.id));

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const listarProfessores: RequestHandler = async (req, res, next) => {
    try {
        const result = await Professor.listarProfessores();

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export default {
    consultarSaldo,
    enviarMoeda,
    listarProfessores,
    getProfessorById,
};
