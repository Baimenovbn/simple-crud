import {STATUS_CODES} from 'http';
import {EStatusCodes} from '../models/enums/status-codes-nums.enum';
import {ICustomError} from '../models/interfaces/custom-error.interface';

export class NotFoundError extends Error implements ICustomError {
  statusCode = EStatusCodes.NOT_FOUND;
  message = STATUS_CODES[EStatusCodes.NOT_FOUND] || '';
}
