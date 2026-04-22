import app from "./app.js";
import dns from 'dns';
dns.setServers([`1.1.1.1`])

import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config();

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