import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class Contact{

    @ApiProperty()
    @IsOptional()
    whatsapp?:string;
    
    @ApiProperty()
    @IsOptional()
    email?:string;

}