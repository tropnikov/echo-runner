import { getUserThemeSchema, setUserThemeSchema } from '../constants/userThemeValidation';

export class SetUserThemeDto {
  userId: number;
  theme: string;

  constructor(data: { userId: number; theme: string }) {
    this.userId = data.userId;
    this.theme = data.theme;
  }

  static validate(data: unknown): { error?: string; value?: SetUserThemeDto } {
    const { error, value } = setUserThemeSchema.validate(data);

    if (error) {
      return { error: error.details[0].message };
    }

    return { value: new SetUserThemeDto(value) };
  }
}

export class GetUserThemeDto {
  userId: number;

  constructor(data: { userId: number }) {
    this.userId = data.userId;
  }

  static validate(data: unknown): { error?: string; value?: GetUserThemeDto } {
    const { error, value } = getUserThemeSchema.validate(data);

    if (error) {
      return { error: error.details[0].message };
    }

    return { value: new GetUserThemeDto(value) };
  }
}
