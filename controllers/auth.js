import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



export const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    
    const token = user.createJWT();

    return res.status(StatusCodes.CREATED).json({ user: { user: user.name }, token });
}

export const login = async (req, res) => {
    res.send('login user');
}