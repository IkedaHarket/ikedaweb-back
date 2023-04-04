import { ApiProperty } from "@nestjs/swagger";


export class HttpErrorResponse{

    @ApiProperty()
    statusCode: number;

    @ApiProperty({
        type: "string",
        isArray: true,
        description: "string | string[]",
        example: "string | string[]",
    })
    message: string[] | string;
    
    @ApiProperty({
        nullable:true
    })
    error?:string;
}