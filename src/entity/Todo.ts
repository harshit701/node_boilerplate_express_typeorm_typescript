import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Arg } from 'type-graphql';

@ObjectType()
@Entity()
export class Todo {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    description: string

    @Field()
    @Column({ default: false })
    completed: boolean

    @Field()
    @Column({ default: false })
    isdeleted: boolean

    @Field()
    @CreateDateColumn()
    createdDate: Date

    @Field()
    @UpdateDateColumn()
    updatedDate: Date
}