import {IncomingMessage} from 'http';

export const getPostData = (req: IncomingMessage): Promise<string> => {
  let result = '';
  return new Promise<string>((res, rej) => {
    req.on('data', (chunk) => {
      result += chunk;
    });

    req.on('end', () => {
      res(result);
    });

    req.on('error', rej);
  })
}
