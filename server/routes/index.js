import express from 'express';
const router = express.Router();

import userRoutes from './authRoute.js';
import boardRoutes from './boardRoute.js';

router.use('/auth', userRoutes);
router.use('/boards', boardRoutes);

export default router;