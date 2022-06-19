import { agent } from "supertest";
import { validate, v4 as uuidv4 } from 'uuid';

import server from "../index";
import {EStatusCodes} from "../models/enums/status-codes-nums.enum";
import {IUser, IUserDB} from "../models/interfaces/user.interface";
import {checkUserCreate} from "./utils";

describe('Test scenarios', () => {

    describe('Scenario 1', () => {
        let createdUser: IUserDB;

        it('should get empty users array', async () => {
            await agent(server)
                .get('/api/users/')
                .expect(EStatusCodes.OK, []);
        });

        it('should create user', async () => {
            const newUser: IUser = {
                age: 25,
                hobbies: ['124124', '12412'],
                username: 'Test'
            }

            const res = await checkUserCreate(newUser, server)

            expect(validate(res.body.id)).toBeTruthy();
            createdUser = res.body;
        });

        it('should return created user when get by id', async () => {
            const res = await agent(server)
                .get(`/api/users/${createdUser.id}/`)
                .expect(EStatusCodes.OK);

            expect(res.body).toMatchObject(createdUser);
        });

        it('should update by id', async () => {
            const updateUserInfo: IUser = {
                username: 'update User',
                hobbies: ['asdsad'],
                age: 22,
            };

            const res = await agent(server)
                .put(`/api/users/${createdUser.id}/`)
                .send(updateUserInfo)
                .expect(EStatusCodes.OK);

            expect(res.body).toMatchObject(updateUserInfo);
        });

        it('should delete by id', async () => {
            await agent(server)
                .delete(`/api/users/${createdUser.id}/`)
                .expect(EStatusCodes.NO_CONTENT);
        });

        it('should get no user by deleted id', async () => {
            await agent(server)
                .delete(`/api/users/${createdUser.id}/`)
                .expect(EStatusCodes.NOT_FOUND);
        });
    })

    describe('Possible user mistakes', () => {

        it('should get "Not Found" when non-existing URL', async () => {
            await agent(server)
                .get('/no-existing/url')
                .expect(EStatusCodes.NOT_FOUND);
        });

        it('should get "Not Found" when used not implemented HTTP METHOD', async () => {
            await agent(server)
                .patch('/api/users/')
                .expect(EStatusCodes.NOT_FOUND);
        });

        it('should get "Not Found" when user not exist', async () => {
            await agent(server)
                .patch(`/api/users/${uuidv4()}`)
                .expect(EStatusCodes.NOT_FOUND);
        });

        it('should get "Bad Request" user has no required field', async () => {
            const userWithoutRequiredField: Partial<IUser> = {
                age: 25,
            }

            await agent(server)
                .post('/api/users/')
                .send(userWithoutRequiredField)
                .expect(EStatusCodes.BAD_REQUEST);
        });

        it('should get "Bad Request" user field has wrong type of data', async () => {
            const userWithWrongDataType = {
                age: '',
                username: 'normal',
                hobbies: ['correct'],
            }

            await agent(server)
                .post('/api/users/')
                .send(userWithWrongDataType)
                .expect(EStatusCodes.BAD_REQUEST);
        });

        it('should get "Bad Request" when fetch by wrong id', async () => {
            await agent(server)
                .get('/api/users/241241')
                .expect(EStatusCodes.BAD_REQUEST);
        });
    })

    describe('Scenario 3', () => {
        let secondUser: IUserDB;

        it('should get empty array at the app start', async () => {
            await agent(server)
                .get('/api/users/')
                .expect(EStatusCodes.OK, []);
        });

        it('should create user1', async function () {
            await checkUserCreate({
                age: 25,
                hobbies: ['walk'],
                username: 'user1',
            }, server);
        })

        it('should create user2', async function () {
            const res = await checkUserCreate({
                age: 277,
                hobbies: ['sit'],
                username: 'user2',
            }, server);

            secondUser = res.body;
        });

        it('should get array with created users', async function () {
            const res = await agent(server)
                .get('/api/users/')
                .expect(EStatusCodes.OK);

            expect(res.body.length).toEqual(2);
        });

        it('should fetch correct user by id', async function () {
            const res = await agent(server)
                .get(`/api/users/${secondUser.id}`)
                .expect(EStatusCodes.OK);

            expect(res.body).toMatchObject(secondUser);
        });

        it('should delete only one user', async function () {
            await agent(server)
                .delete(`/api/users/${secondUser.id}`)
                .expect(EStatusCodes.NO_CONTENT);
        });

        it('should fetch only one user array', async function () {
            const res = await agent(server)
                .get(`/api/users/`)
                .expect(EStatusCodes.OK);

            expect(res.body.length).toBe(1);
        });
    });
})
