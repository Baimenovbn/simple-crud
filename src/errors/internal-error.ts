import {EStatusCodes} from '../models/enums/status-codes-nums.enum';
import {ICustomError} from '../models/interfaces/custom-error.interface';

export class InternalError extends Error implements ICustomError {
  statusCode = EStatusCodes.INTERNAL_SERVER_ERROR;
  constructor() {
    super('Error has happened at the server, please, contact support team');
  }
}
