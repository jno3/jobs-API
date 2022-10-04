import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'


export const register = async (req, res) => {
    const user = await User.create({ ...req.body });

    const token = user.createJWT();

    return res.status(StatusCodes.CREATED).json({ user: { user: user.name }, token });
}

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new BadRequestError('please provide email and password');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password); 
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('invalid credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { user: user.name }, token });
}