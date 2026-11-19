import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/auth.js';

export async function registrerUser(email, password){
    try{
        if(User.find(email) ==  true){
            return {success: false, message: "User already exist"}
        }
        const cryptPass = await bcrypt.hash(password, 12);

        const userData = {
            email: email,
            password: cryptPass
        };
        await User.create(userData);
        return { success: true, message: "User registered successfully" };
    }
    catch (err) {
        return { success: false, message: "User can't be register " + err };
    }
}


export async function loginUser(email, password){
    try{
        const user = await User.findOne({ email: email });

        const isPasswordValid = user && await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return { success: false, message: "Login incorrect" };
        }

        const token = jwt.sign(
            {id: user._id, email: user.email}, 
            JWT_SECRET,
            {expiresIn: '1h'}
        )
        return { success: true, message: "Login successful", token };
    }
    catch (err) {
        return { success: false, message: "Login incorrect" + err };
    }
}