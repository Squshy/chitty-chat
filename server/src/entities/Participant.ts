import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MAX_USERNAME_LENGTH } from "../constants";
import { Conversation } from "./Conversation";
import { User } from "./User";

@ObjectType()
@Entity()
export class Participant extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Field()
  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  @Column({ nullable: false })
  conversation!: string;

  @Field()
  @ManyToOne(() => User, (user) => user.id)
  @Column()
  user!: User;

  @Field()
  @Column({ length: MAX_USERNAME_LENGTH, nullable: true })
  nickname: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
