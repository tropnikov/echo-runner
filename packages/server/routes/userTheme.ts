import { Router } from 'express';

import { UserThemeController } from '../controllers/userTheme';
import { authMiddleware } from '../middlewares/authMiddleware';
import { UserTheme } from '../models/UserTheme';
import { UserThemeService } from '../services/UserTheme';

const userThemeService = new UserThemeService(UserTheme);
const userThemeController = new UserThemeController(userThemeService);
const router: Router = Router();

/**
 * Get user theme
 */
router.get('/', authMiddleware, (req, res) => userThemeController.getUserTheme(req, res));

/**
 * Set user theme
 */
router.post('/', authMiddleware, (req, res) => userThemeController.setUserTheme(req, res));

export default router;
