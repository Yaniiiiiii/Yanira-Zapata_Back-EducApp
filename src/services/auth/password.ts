import bc from 'bcryptjs';

export class Password {
    encrypt = (password: string) => {
        return bc.hash(password, 10);
    };
    validate = (newPassword: string, hash: string) => {
        return bc.compare(newPassword, hash);
    };
}
