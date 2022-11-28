import * as dotenv from 'dotenv';
dotenv.config();

export const USER = process.env.MYUSER;
export const PASS = process.env.PASS;
export const CLUSTER = process.env.CLUSTER;
export const SECRET = process.env.SECRET;
