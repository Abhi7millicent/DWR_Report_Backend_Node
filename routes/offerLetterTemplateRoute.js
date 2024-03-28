import express from 'express';
import {offerLetterController} from '../controllers/offerLetterTemplateController.js';

const router = express.Router();

router.get('/offer-letter', offerLetterController);

export default router;