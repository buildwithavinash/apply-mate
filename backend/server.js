import app from "./app.js";
import dns from 'dns';
dns.setServers([`1.1.1.1`])

import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5000;
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];


const startServer = async () => {
    try {
        const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

        if(missingEnvVars.length > 0){
            throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
        }

        await connectDB();

        app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
    }catch(err){
        console.log(err);
    }
}

startServer()
