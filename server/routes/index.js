import express from 'express';
const router = express.Router();

import userRoutes from './authRoute.js';

router.use('/auth', userRoutes);

export default router;