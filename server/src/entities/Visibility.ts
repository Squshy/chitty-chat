import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class Visibility extends BaseEntity {
  @Field()
  @ManyToOne(() => Profile, (profile) => profile.visibility)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 15, unique: true })
  type: string;
}
