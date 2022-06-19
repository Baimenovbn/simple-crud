import {config} from 'dotenv';
import {createServer} from 'http';

import {InternalError} from './errors/internal-error';
import {handleErrorResponse} from './utils/handle-error-response';
import {MainController} from './controllers/main.controller';

config();

const server = createServer(async (req, res) => {
  try {
  await MainController.handleIncomingRequests(req, res);
  } catch (e) {
    console.error(e);
    handleErrorResponse(res, new InternalError());
  }
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
})





