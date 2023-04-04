import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "skills"})
export class Skill {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty()
    @Column({
        type: "text",
        default: "#ff8100"
    })
    color:string;

    @ApiProperty()
    @Column({
        type: "text"
    })
    description:string;

    @ApiProperty()
    @Column({
        type: "int",
        default: 0
    })
    percentage:number;

    @ApiProperty()
    @Column({
        type: "text"
    })
    title:string;
}
