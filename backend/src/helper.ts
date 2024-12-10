function generateRandomPassword(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const password = [];
    for (let i = 0; i < length; i++) {
        password.push(charset.charAt(Math.floor(Math.random() * charset.length)));
    }
    return password.join('');
}

function parseUserForResponse (user: object) {
    const returnData = JSON.parse(JSON.stringify(user));
    delete returnData.password;
    return returnData;
}

const Errors = {
    UsernameAlreadyTaken: 'UserNameAlreadyTaken',
    EmailAlreadyInUse: 'EmailAlreadyInUse',
    ValidationError: 'ValidationError',
    ServerError: 'ServerError',
    ClientError: 'ClientError',
    UserNotFound: 'UserNotFound'
}

export { generateRandomPassword, parseUserForResponse, Errors }