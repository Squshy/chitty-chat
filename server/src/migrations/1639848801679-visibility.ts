import { MigrationInterface, QueryRunner } from "typeorm";

export class visibility1639848801679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO visibility (type) VALUES ('public');
        INSERT INTO visibility (type) VALUES ('private');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
