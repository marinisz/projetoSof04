import { RequestHandler } from 'express';
import AlunoRepo from '../repository/AlunoRepository';

const solicitarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const { useId, vantagemId } = req.query;
        const result = await AlunoRepo.solicitarVantagem(Number(useId), vantagemId as string);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const consultarSaldo: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const result = await AlunoRepo.consultarSaldo(id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const getAlunoById: RequestHandler = async (req, res, next) => {
    try {
        const result = await AlunoRepo.getById(Number(req.params.id));

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const atualizarAluno: RequestHandler = async (req, res, next) => {
    try {
        const result = await AlunoRepo.atualizarAluno(Number(req.params.id), req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const deletarAluno: RequestHandler = async (req, res, next) => {
    try {
        const result = await AlunoRepo.deletarAluno(Number(req.params.id));

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const listarAlunos: RequestHandler = async (req, res, next) => {
    try {
        const result = await AlunoRepo.listarAlunos();

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export default {
    solicitarVantagem,
    consultarSaldo,
    listarAlunos,
    deletarAluno,
    atualizarAluno,
    getAlunoById
};
