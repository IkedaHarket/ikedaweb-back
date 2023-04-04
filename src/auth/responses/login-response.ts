import { ApiProperty } from "@nestjs/swagger";

interface IntputLoginResponse{
    id:string;
    email:string;
    fullName:string;
    token:string;
}

export class LoginResponse{

    constructor({id, email, fullName, token}: IntputLoginResponse) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.token = token;
    }
    @ApiProperty()
    id:string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    fullName:string;

    @ApiProperty()
    token:string;
}