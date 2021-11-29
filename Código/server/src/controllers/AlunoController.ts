import { RequestHandler } from 'express';
import AlunoModel from '../models/Aluno';

const Aluno = new AlunoModel()

const solicitarVantagem: RequestHandler = async (req, res, next) => {
    try {
        const { id, vid } = req.params;
        const result = await Aluno.solicitarVantagem(Number(id), vid as string);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const consultarSaldo: RequestHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const result = await Aluno.consultarSaldo(id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const getAlunoById: RequestHandler = async (req, res, next) => {
    try {
        const result = await Aluno.getById(Number(req.params.id));

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const atualizarAluno: RequestHandler = async (req, res, next) => {
    try {
        const result = await Aluno.atualizarAluno(Number(req.params.id), req.body);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};


const deletarAluno: RequestHandler = async (req, res, next) => {
    try {
        const result = await Aluno.deletarAluno(Number(req.params.id));

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const listarAlunos: RequestHandler = async (req, res, next) => {
    try {
        const result = await Aluno.listarAlunos();

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
