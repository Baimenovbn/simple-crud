import {ServerResponse} from 'http';

import {createErrorResponse} from './create-message-error';
import {ICustomError} from '../models/interfaces/custom-error.interface';

export const handleErrorResponse = (res: ServerResponse, error: ICustomError) => {
  res.writeHead(error.statusCode, error.message);
  res.end(createErrorResponse(error));
}
