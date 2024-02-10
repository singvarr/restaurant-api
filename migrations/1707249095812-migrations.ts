import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1707249095812 implements MigrationInterface {
  name = 'Migrations1707249095812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "restaurant" ("id" integer NOT NULL, "name" character varying NOT NULL, "cuisineType" character varying NOT NULL, CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "restaurant"`);
  }
}
