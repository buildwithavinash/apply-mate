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


const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
    }catch(err){
        console.log(err);
    }
}

startServer()
