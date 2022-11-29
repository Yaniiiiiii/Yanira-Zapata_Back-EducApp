import jwt from 'jsonwebtoken';
import { SECRET } from '../../config.js';
import { TokenPayload } from './token.type.js';

export class Auth {
    getSecret(secret = SECRET) {
        if (typeof secret !== 'string' || secret === '') {
            throw new Error('Not a valid Token');
        }
        return secret;
    }
    createToken(payload: TokenPayload) {
        return jwt.sign(payload, this.getSecret());
    }
    readToken(token: string) {
        const payload = jwt.verify(token, this.getSecret());
        return payload as jwt.JwtPayload;
    }
}
