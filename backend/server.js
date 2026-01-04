// Express Server
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import doctorRoutes from './routes/doctorRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes

app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/departments', departmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
