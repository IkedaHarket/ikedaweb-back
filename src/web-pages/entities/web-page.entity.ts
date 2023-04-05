import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "webpage"})
export class WebPage {
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty()
    @Column({
        type: "text",
        unique:true,
    })
    title:string;

    @ApiProperty()
    @Column({
        type: "text"
    })
    description:string;

    @ApiProperty()
    @Column({
        type: "text"
    })
    image:string;

    @ApiProperty()
    @Column({
        type: "text"
    })
    url:string;

}
