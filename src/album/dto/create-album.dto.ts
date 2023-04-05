import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateAlbumDto {

    @ApiProperty()
    @IsString()
    title:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?:string;
    
    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
