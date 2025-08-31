import express from 'express';
import cors from 'cors';
import './config/env.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import './config/db.js'; 

import routes from './routes/index.js';
app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});