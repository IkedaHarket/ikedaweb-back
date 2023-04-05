import { ApiProperty } from "@nestjs/swagger";

export class WebPageConfiguration{
    
    @ApiProperty()
    presentationImage: string;
    @ApiProperty()
    presentationDescription: string;
}