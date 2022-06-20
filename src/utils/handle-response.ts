import {ServerResponse, STATUS_CODES} from 'http';

export const handleResponse = <T>(res: ServerResponse, statusCode: number, data: T) => {
  res.writeHead(statusCode, STATUS_CODES[statusCode]);
  res.end(JSON.stringify(data));
}
