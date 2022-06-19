import {IncomingMessage, ServerResponse} from 'http';
import {IUser, IUserDB} from '../models/interfaces/user.interface';
import {validate as validateUUID} from 'uuid';
import {UserDB} from '../DB/user.db.class';
import {handleErrorResponse} from '../utils/handle-error-response';
import {BadRequestError} from '../errors/bad-request';
import {handleResponse} from '../utils/handle-response';
import {EStatusCodes} from '../models/enums/status-codes-nums.enum';
import {getPostData} from '../utils/get-post-data';
import {NotFoundError} from '../errors/not-found';

export class UsersController {
  public static handleUser = async (req: IncomingMessage, res: ServerResponse, userId: string ) => {
    let foundUser: IUserDB | undefined;

    if (validateUUID(userId)) {
      foundUser = await UserDB.getById(userId);
    } else {
      handleErrorResponse(res, new BadRequestError());
      return;
    }

    if (foundUser) {
      switch (req.method) {
        case 'GET':
          handleResponse(res, EStatusCodes.OK, foundUser);
          return;
        case 'DELETE':
          await UserDB.delete(userId);
          handleResponse(res, EStatusCodes.NO_CONTENT, '');
          return;
        case 'PUT':
          await UsersController.handleExistingUser(req,  res, async (user) => {
            await UserDB.update(userId, user);
            const updatedUser = await UserDB.getById(userId);
            handleResponse(res, EStatusCodes.OK, updatedUser);
          });
          return;
      }
    }

    handleErrorResponse(res, new NotFoundError());
  }

  public static handleUsers = async (req: IncomingMessage, res: ServerResponse) => {
    switch (req.method) {

      case 'GET':
        const users = await UserDB.getAll();
        handleResponse(res, EStatusCodes.OK, users);
        break;
      case 'POST':
        await UsersController.handleExistingUser(req, res, async (user) => {
          const created = await UserDB.create(user);
          handleResponse(res, EStatusCodes.CREATED, created);
        })
        break
      default:
        handleErrorResponse(res, new NotFoundError());
    }
  }

  private static async handleExistingUser(
    req: IncomingMessage,
    res: ServerResponse,
    onSuccess: (user: IUser) => Promise<void>,
  ) {
    const rawData = await getPostData(req);
    const user = JSON.parse(rawData);
    if (UserDB.hasAllRequiredFields(user)) {
      await onSuccess(user);
    } else {
      handleErrorResponse(res, new BadRequestError());
    }
  }
}
