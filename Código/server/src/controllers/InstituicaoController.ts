import { RequestHandler } from 'express';
import InstituicaoModel from '../models/Instituicao';

const Instituicao  = new InstituicaoModel()


const listarInstituicaos: RequestHandler = async (req, res, next) => {
    try {
        const result = await Instituicao.listarInstituicaos();

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

const getInstituicaoById: RequestHandler = async (req, res, next) => {
    try {
        const result = await Instituicao.getById(req.params.id);

        return res.send(result);
    } catch (error) {
        next(error);
    }
};

export default {
    getInstituicaoById,
    listarInstituicaos,
};
