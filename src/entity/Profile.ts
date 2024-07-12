import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Profile {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    user_id: String;

    @Field()
    @Column({ nullable: true })
    full_name: String

    @Field()
    @Column({ nullable: true })
    birth_date: Date

    @Field()
    @Column({ nullable: true })
    gender: String

    @Field()
    @Column({ nullable: true })
    avatar_url: String

    @Field()
    @Column({ nullable: true })
    bio: String

    @Field()
    @Column({ nullable: true })
    location: String

    @Field()
    @Column({ nullable: true })
    website: String

    @Field()
    @Column({ default: false })
    isdeleted: boolean

    @Field()
    @CreateDateColumn()
    createdDate: Date

    @Field()
    @UpdateDateColumn()
    updatedDate: Date

    @Field(() => User)
    @OneToOne(() => User, user => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: User;
}