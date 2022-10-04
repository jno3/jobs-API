import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('authentication invalid');
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.SESSION_SECRET);
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (err) {
        throw new UnauthenticatedError('authentication invalid');
    }
}

export default auth;