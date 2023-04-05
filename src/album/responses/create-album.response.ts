import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities";
import { ImageAlbumResponse } from "./";

export class CreateAlbumResponse{

    @ApiProperty()
    title:string;
    
    @ApiProperty()
    id:string;
    
    @ApiProperty({
        type: ImageAlbumResponse,
        isArray:true
    })
    images:ImageAlbumResponse[];
    
    @ApiProperty()
    description:string;
    
    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    user: User;
}