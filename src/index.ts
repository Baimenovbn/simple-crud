import { config } from 'dotenv';
import {createServer} from 'http';
import {MainController} from './controllers/main.controller';

config();

const server = createServer(async (req, res) => {
  // try {
  await MainController.handleIncomingRequests(req, res);
  // } catch (e) {
  //   handleErrorResponse(res, new InternalError());
  // }
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
})





