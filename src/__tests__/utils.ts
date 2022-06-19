import {agent} from "supertest";
import {Server} from "http";

import {IUser} from "../models/interfaces/user.interface";
import {EStatusCodes} from "../models/enums/status-codes-nums.enum";

export async function checkUserCreate(user: IUser, server: Server) {
    const res = await agent(server)
        .post('/api/users/')
        .send(user)
        .expect(EStatusCodes.CREATED);

    expect(res.body).toMatchObject(user);
    return res;
}