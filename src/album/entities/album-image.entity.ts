import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Album } from ".";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'album_images' })
export class AlbumImage{
    
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id:string;

    @Column('text')
    @ApiProperty()
    url:string;

    @ApiProperty()
    @ManyToOne(
        () => Album,
        ( album ) => album.images,
        {  onDelete: 'CASCADE' }
    )
    album: Album
}