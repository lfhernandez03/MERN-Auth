import { Request } from 'express';
import { UserInterface } from '../models/user';

// Extender el tipo Request para incluir user
export interface AuthenticatedRequest extends Request {
    user?: UserInterface;
}

export interface JwtPayload {
    id: string;
}
