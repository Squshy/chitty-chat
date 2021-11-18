import {MigrationInterface, QueryRunner} from "typeorm";

export class NewUserFriends1637265911596 implements MigrationInterface {
    name = 'NewUserFriends1637265911596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "displayName" character varying NOT NULL DEFAULT 'user', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "friend" ("user_id" uuid NOT NULL, "friend_id" uuid NOT NULL, "confirmed" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e957b95fab0842d8714f846ef9" PRIMARY KEY ("user_id", "friend_id"))`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_09adc6915c9ef6c17d6b42e6149" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_ad82b556a3a1c0f48deb40e1393" FOREIGN KEY ("friend_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_ad82b556a3a1c0f48deb40e1393"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_09adc6915c9ef6c17d6b42e6149"`);
        await queryRunner.query(`DROP TABLE "friend"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
