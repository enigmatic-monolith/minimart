import { IsEmail, IsString, IsUUID } from "class-validator";

export class UserInfo {
    @IsUUID()
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export class SetPasswordInfo {
    @IsUUID()
    id: string;

    @IsUUID()
    token: string;

    @IsString()
    newPassword: string;

    constructor(id: string, token: string, newPassword: string) {
        this.id = id;
        this.token = token;
        this.newPassword = newPassword;
    }
}
