// routes/technologyRoutes.js
import express from 'express';
import {
  createTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnology,
  updateDeleteFlag,
} from '../controllers/technologyController.js';

const router = express.Router();

router.post('/', createTechnology);
router.get('/', getTechnologies);
router.get('/:id', getTechnologyById);
router.put('/:id', updateTechnology);
router.patch('/:id', updateDeleteFlag);

export default router;
