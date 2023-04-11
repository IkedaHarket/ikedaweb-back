import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse{

    constructor({id, email, fullName, isActive, roles, token}: LoginResponse) {
        this.id = id
        this.email = email
        this.fullName = fullName
        this.isActive = isActive
        this.roles = roles
        this.token = token
    }
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    roles: string[];

    @ApiProperty()
    token:string;
}