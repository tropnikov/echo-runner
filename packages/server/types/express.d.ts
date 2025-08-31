import { User } from './User'; // Убедись, что путь правильный

declare global {
  namespace Express {
    interface Request {
      user?: User;
      cookies: Record<string, string>;
    }
  }
}

export {};
