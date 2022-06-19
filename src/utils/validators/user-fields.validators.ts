import { IUser } from '../../models/interfaces/user.interface';

export const userFieldsValidators = new Map<keyof IUser, <T>(value: T) => boolean>()

  .set('age', (value) => typeof value === 'number')

  .set('username', (value) => typeof value === 'string')

  .set('hobbies', (value) => Array.isArray(value)
    && value.every((hobby) => typeof hobby === 'string')
  );
