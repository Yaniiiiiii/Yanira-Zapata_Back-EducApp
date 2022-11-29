import mongoose from 'mongoose';
import { USER, CLUSTER, PASS } from '../config.js';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'resources' : 'resourcesTesting';
    let uri = `mongodb+srv://${USER}:${PASS}`;
    uri += `@${CLUSTER}/${DBName}?retryWrites=true&w=majority`;
    console.log(uri);
    return mongoose.connect(uri);
}
