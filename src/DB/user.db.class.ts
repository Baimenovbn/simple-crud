import { v4 as uuidv4 } from 'uuid';

import {IUser, IUserDB} from '../models/interfaces/user.interface';
import {userFieldsValidators} from '../utils/validators/user-fields.validators';

export class UserDB {
  private static users: IUserDB[] = [];

  private static readonly requiredFields: (keyof IUser)[] = ['username', 'hobbies', 'age'];

  private static validators = userFieldsValidators;

  static getAll() {
    return Promise.resolve(this.users);
  }

  static getById(id: string) {
    return Promise.resolve(UserDB.users.find((user) => user.id === id));
  }

  static delete(id: string) {
    UserDB.users = UserDB.users.filter((user) => user.id !== id);
    return Promise.resolve();
  }

  static create(user: IUser): Promise<IUserDB> {
    const createdUser = {...user, id: uuidv4()};
    UserDB.users.push(createdUser);
    return Promise.resolve(createdUser);
  }

  public static hasAllRequiredFields(user: Partial<IUser>) {
    return UserDB.requiredFields.every((requiredField) => {
      const validate = UserDB.validators.get(requiredField);
      return user[requiredField] !== undefined && validate?.(user[requiredField]);
    }) && Object.keys(user).length === UserDB.validators.size;
  }

  static async update(id: string, newUserData: IUser) {
    UserDB.users = UserDB.users.map((user) => user.id === id
      ? {...user, ...newUserData }
      : user
    );
    return Promise.resolve();
  }
}
