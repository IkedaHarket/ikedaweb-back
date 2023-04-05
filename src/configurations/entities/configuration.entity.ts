import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Contact, SocialNetwork } from "../class";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: "configuration"})
export class Configuration {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id:string;

    @Column({
        type: "text"
    })
    @ApiProperty()
    contact: Contact;

    @Column({
        type: "text",
        array:true
    })
    @ApiProperty({
        type: SocialNetwork,
        isArray: true,
    })
    socialNetwork: SocialNetwork[];
    
}

