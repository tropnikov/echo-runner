import { Request } from 'express';
import { User } from 'User';

export type ProtectedRequest = Request & { user: User };
