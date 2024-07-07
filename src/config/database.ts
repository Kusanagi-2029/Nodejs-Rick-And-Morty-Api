import * as fs from 'fs';
import { getPassword } from '../utils/passwordEntering';

export const TABLE_NAME = 'kusanagi_2029';
export const DATABASE_URL = 'postgres://postgres:root@localhost:5432/postgres';

const USER_PASSWORD = getPassword('Input the password for connection to Yandex.cloud\nUser: Kusanagi-2029: \nHis Password: ');
console.log(`Вы ввели: ${USER_PASSWORD}`);

const config = {
    connectionString: `postgres://candidate:${USER_PASSWORD}@rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net:6432/db1`,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(`${process.env.HOME}/.postgresql/root.crt`).toString(),
    },
};


/*
 // local db connection:
const config = {
    user: 'local_user',
    host: 'local_host',
    database: 'local_database',
    password: 'local_password',
    port: local_port,
    ssl: true/false,
};
 */
export default config;