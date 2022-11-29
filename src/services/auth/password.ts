import bc from 'bcryptjs';

export class Password {
    passwordEncrypt = (password: string) => {
        return bc.hash(password, 10);
    };
    passwordValidate = (newPassword: string, hash: string) => {
        return bc.compare(newPassword, hash);
    };
}
