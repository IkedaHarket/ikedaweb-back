import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';


@Entity('users')
export class User {
    
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty()
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty()
    @Column('text')
    fullName: string;

    @ApiProperty()
    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
