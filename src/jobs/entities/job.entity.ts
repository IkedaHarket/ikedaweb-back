import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "jobs"})
export class Job {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty()
    @Column("text")
    name:string;

    @ApiProperty()
    @Column("text")
    image:string;

    @ApiProperty()
    @Column("timestamptz")
    startDateJob: string;

    @ApiProperty()
    @Column("timestamptz")
    endDateJob:string;

    @ApiProperty()
    @Column("text")
    description:string;
    
    @ApiProperty()
    @Column("text")
    position:string;
}
