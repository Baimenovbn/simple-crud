import {STATUS_CODES} from 'http';
import {EStatusCodes} from '../models/enums/status-codes-nums.enum';
import {ICustomError} from '../models/interfaces/custom-error.interface';

export class BadRequestError extends Error implements ICustomError {
  statusCode = EStatusCodes.BAD_REQUEST;
  message = STATUS_CODES[EStatusCodes.BAD_REQUEST] || '';
}
