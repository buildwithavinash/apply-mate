import express from 'express';
import jobRoutes from './routes/jobRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'

const app = express();

// middleware
app.use(cors({
    origin: "*",
}));
app.use(express.json());


// connect routes
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes)


// route
app.get("/", (req, res)=> {
    res.send("Api is running...");
});

export default app;