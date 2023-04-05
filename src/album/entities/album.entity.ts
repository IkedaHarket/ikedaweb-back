import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlbumImage } from "./";
import { User } from "src/auth/entities";

@Entity({ name: 'albums' })
export class Album {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty()
    @Column('text')
    title:string;

    @ApiProperty()
    @Column('text')
    description:string;
    
    @ApiProperty()
    @CreateDateColumn()
    created_at: Date; 

    @ApiProperty()
    @OneToMany(
        () => AlbumImage,
        (albumImage) => albumImage.album,
        { cascade: true, eager: true }
    )
    images?: AlbumImage[];

    @ApiProperty()
    @ManyToOne(
        () => User,
        ( user ) => user.album,
        { eager: true }
    )
    user: User
}
