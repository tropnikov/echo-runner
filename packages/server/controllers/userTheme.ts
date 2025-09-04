import { Response } from 'express';

import { GetUserThemeDto, SetUserThemeDto } from '../dto/userTheme';
import { UserThemeService } from '../services/UserTheme';
import { ErrorResponse, GetUserThemeRequest, SetUserThemeRequest, UserThemeResponse } from '../types/userTheme';

export class UserThemeController {
  constructor(private readonly userThemeService: UserThemeService) {}

  async getUserTheme(req: GetUserThemeRequest, res: Response<UserThemeResponse | ErrorResponse>) {
    const validation = GetUserThemeDto.validate({ userId: req.user?.id });

    if (validation.error || !validation.value) {
      return res.status(400).json({ error: validation.error || 'Validation error' });
    }

    const dto = validation.value;

    try {
      const theme = await this.userThemeService.getUserTheme(dto.userId);

      if (!theme) {
        return res.status(404).json({ error: 'Theme not found' });
      }

      res.json(theme);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
  }

  async setUserTheme(req: SetUserThemeRequest, res: Response<UserThemeResponse | ErrorResponse>) {
    const validation = SetUserThemeDto.validate({
      userId: req.user?.id,
      theme: req.body.theme,
    });

    if (validation.error || !validation.value) {
      return res.status(400).json({ error: validation.error || 'Validation error' });
    }

    const dto = validation.value;

    try {
      const theme = await this.userThemeService.setUserTheme(dto.userId, dto.theme);
      res.status(201).json(theme);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
      return;
    }
  }
}
