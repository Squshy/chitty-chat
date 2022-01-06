import { MAX_USERNAME_LENGTH } from "../constants";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Friend } from "./Friend";
import { Profile } from "./Profile";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({ unique: true, length: MAX_USERNAME_LENGTH })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Column()
  password!: string;

  @OneToMany(() => Friend, (friend) => friend.user && friend.friend, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  friends!: User[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
