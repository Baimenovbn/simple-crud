import {IncomingMessage, ServerResponse} from 'http';
import {handleErrorResponse} from '../utils/handle-error-response';
import {NotFoundError} from '../errors/not-found';
import {UsersController} from './users.controller';

export class MainController {
  static async handleIncomingRequests (req: IncomingMessage, res: ServerResponse) {
    res.setHeader('Content-Type', 'application/json');
    const segments = req.url?.trim().split('/');

    if (!segments) {
      res.end('');
      return;
    }

    if (segments[1] === 'api') {
      if (segments[2] === 'users') {
        const userId = segments[3];
        if (userId) {
          await UsersController.handleUser(req, res, userId);
        } else {
          await UsersController.handleUsers(req, res);
        }
        return;

      }
    }

    handleErrorResponse(res, new NotFoundError());
  }
}
