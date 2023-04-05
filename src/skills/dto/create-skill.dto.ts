import { ApiProperty } from "@nestjs/swagger";
import { IsHexColor, IsInt, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateSkillDto {

    @ApiProperty()
    @IsHexColor()
    color:string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?:string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(100)
    percentage:number;

    @ApiProperty()
    @IsString()
    @MaxLength(30)
    title:string;
}
