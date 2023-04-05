import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsOptional } from "class-validator";

export class SocialNetwork{

    @ApiProperty()
    name:string;

    @ApiProperty()
    url:string;

    @ApiProperty()
    @IsOptional()
    icon?:string;

    @ApiProperty()
    @IsHexColor()
    @IsOptional()
    color?:string;
}