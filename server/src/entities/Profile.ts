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
import { Visibility } from "./Visibility";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Visibility, (visibility) => visibility.id)
  @Column()
  visibility: number;

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
