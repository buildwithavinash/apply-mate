import express from 'express';

const app = express();

// middleware
app.use(express.json());

// route
app.get("/", (req, res)=> {
    res.send("Api is running...");
});

export default app;