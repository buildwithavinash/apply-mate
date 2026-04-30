import express from 'express';
import jobRoutes from './routes/jobRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'

const app = express();
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : "*";

// middleware
app.use(cors({
    origin: allowedOrigins,
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
