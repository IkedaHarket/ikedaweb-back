import { ApiProperty } from "@nestjs/swagger";

export class ImageAlbumResponse{

    @ApiProperty()
    id:string;
    
    @ApiProperty()
    url:string;
}