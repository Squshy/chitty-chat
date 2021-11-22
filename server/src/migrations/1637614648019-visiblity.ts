import {MigrationInterface, QueryRunner} from "typeorm";

export class visiblity1637614648019 implements MigrationInterface {
    name = 'visiblity1637614648019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "visibility" character varying NOT NULL DEFAULT 'public'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "visibility"`);
    }

}
