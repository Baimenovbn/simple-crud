import {config} from 'dotenv';
import {createServer} from 'http';
import cluster from "cluster";

import {InternalError} from './errors/internal-error';
import {handleErrorResponse} from './utils/handle-error-response';
import {MainController} from './controllers/main.controller';
import * as os from "os";

config();

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    const server = createServer(async (req, res) => {
        try {
            await MainController.handleIncomingRequests(req, res);
        } catch (e) {
            console.error(e);
            handleErrorResponse(res, new InternalError());
        }
    });

    server.listen(process.env.PORT || 4000, () => {
        console.log(`${process.pid} listening on port ${process.env.PORT || 4000}`);
    })

}

