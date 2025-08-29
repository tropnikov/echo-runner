import { UserTheme, UserThemeCreationAttributes } from '../models/UserTheme';

export class UserThemeService {
  constructor(private readonly userThemeModel: typeof UserTheme) {}

  async getUserTheme(userId: number): Promise<UserTheme | null> {
    return await this.userThemeModel.findOne({ where: { userId } });
  }

  async setUserTheme(userId: number, theme: string): Promise<UserTheme> {
    const existingTheme = await this.getUserTheme(userId);

    if (existingTheme) {
      existingTheme.theme = theme;
      return await existingTheme.save();
    } else {
      const themeData: UserThemeCreationAttributes = { userId, theme };
      return await this.userThemeModel.create(themeData);
    }
  }
}
