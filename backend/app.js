import express from 'express';
import jobRoutes from './routes/jobRoutes.js'

const app = express();

// middleware
app.use(express.json());


// connect routes
app.use('/api/jobs', jobRoutes);


// route
app.get("/", (req, res)=> {
    res.send("Api is running...");
});

export default app;