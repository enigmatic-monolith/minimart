import { IsUUID } from "class-validator";

export class UserInfo {
    @IsUUID()
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}
