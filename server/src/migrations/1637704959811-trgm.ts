import {MigrationInterface, QueryRunner} from "typeorm";

export class trgm1637704959811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE EXTENSION pg_trgm;
        CREATE INDEX trgm_idx ON "user" USING gist (username gist_trgm_ops);
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        DROP EXTENSION pg_trgm;
        DROP INDEX trgm_idx;
      `)
    }

}
