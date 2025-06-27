import { UserInterface } from '../../models/user';
import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserInterface;
  }
}