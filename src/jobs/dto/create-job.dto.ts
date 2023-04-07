import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, IsUrl } from "class-validator";

export class CreateJobDto {

    @ApiProperty()
    @IsString()
    name:string;

    @ApiProperty()
    @IsUrl()
    image:string;

    @ApiProperty()
    @IsDateString()
    startDateJob: string;

    @ApiProperty()
    @IsDateString()
    endDateJob:string;

    @ApiProperty()
    @IsString()
    description:string;

    @ApiProperty()
    @IsString()
    position:string;
}
