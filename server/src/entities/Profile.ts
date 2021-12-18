import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Visibility } from "./Visibility";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: string;

  @Field()
  @ManyToOne(() => Visibility, (visibility) => visibility.id)
  @JoinColumn()
  visibility: Visibility;

  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column()
  avatar: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
