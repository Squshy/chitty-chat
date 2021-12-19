import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class Visibility extends BaseEntity {
  @OneToMany(() => Profile, (profile) => profile.visibility)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field()
  @Column({ length: 15, unique: true })
  type: string;
}
