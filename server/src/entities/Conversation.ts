import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DEFAULT_AVATAR } from "../constants";
import { Participant } from "./Participant";

@ObjectType()
@Entity()
export class Conversation extends BaseEntity {
  @Field()
  @OneToMany(() => Participant, participant => participant.conversation)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ nullable: false })
  title!: string;

  @Field()
  @Column({ nullable: false, default: DEFAULT_AVATAR })
  image!: string;

  /* 
    A 'primary' conversation refers to the initial conversation between two users.
    A 'non-primary' conversation can refer to conversations with multiple users like group chats.
  */
  @Field()
  @Column({ default: true, nullable: false })
  primary!: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
