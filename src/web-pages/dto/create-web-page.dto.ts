import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateWebPageDto {

    @ApiProperty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?:string;

    @ApiProperty()
    @IsString()
    image:string;

    @ApiProperty()
    @IsString()
    url:string;
}
