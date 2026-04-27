import { User } from "../models/User";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check existing user
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: "User Already Exists"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered"
        });


    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
};