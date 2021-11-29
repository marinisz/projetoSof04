import { Router } from 'express';
import api from '../controllers/ProfessorController';

const router = Router();

router.get('/', api.listarProfessores)
router.get('/:id', api.getProfessorById)
router.get('/consultarSaldo/:id', api.consultarSaldo);
router.patch('/enviarMoeda/:id', api.enviarMoeda)

export default router;
