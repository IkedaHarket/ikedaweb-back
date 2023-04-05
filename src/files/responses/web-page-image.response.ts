import { ApiProperty } from "@nestjs/swagger";

export class WebPageResponse{

    constructor(url:string){
        this.url = url
    }
    
    @ApiProperty()
    url: string;
}