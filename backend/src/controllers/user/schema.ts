export namespace UserSchema {
    export interface Create {
        email: string;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
    }

    export interface Find {
        key: string;
        value: string | number;
    }

    export interface Edit {
        email?: string;
        username?: string;
        firstName?: string;
        lastName?: string;
    }
}