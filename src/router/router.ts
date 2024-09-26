
import express from 'express';
import { createBeeper, getAll, getById, deleteB, updateStatus, getByStatus } 
from '../controllers/controller';

const router = express.Router();

router.post('/', createBeeper); 
router.get('/', getAll); 
router.get('/:id', getById); 
router.put('/:id/status', updateStatus); 
router.delete('/:id', deleteB);
router.get('/status/:status', getByStatus);

export default router;
