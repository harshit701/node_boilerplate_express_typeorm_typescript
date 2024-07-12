import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    username: string

    @Field()
    @Column()
    email: string

    @Field()
    @Column()
    password: string

    @Field()
    @Column({ default: false })
    isdeleted: boolean

    @Field()
    @CreateDateColumn()
    createdDate: Date

    @Field()
    @UpdateDateColumn()
    updatedDate: Date

    @Field(() => Profile, { nullable: true })
    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;
}