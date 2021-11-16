import {MigrationInterface, QueryRunner} from "typeorm";

export class userTRGM1637022285437 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE INDEX username_trgm_idx
        ON "user"
        USING GIST (username gist_trgm_ops);
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
