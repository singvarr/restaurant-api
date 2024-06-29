import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1718311749786 implements MigrationInterface {
  name = 'Migrations1718311749786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "menu" ("id" SERIAL NOT NULL, "menu" jsonb NOT NULL, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "restaurant" ADD "menuId" integer`);
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_d8dc3269a0929364fae6a6b73b9" UNIQUE ("menuId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_9315499c5bf5ead89fbb877a0b5" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_d8dc3269a0929364fae6a6b73b9" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_d8dc3269a0929364fae6a6b73b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_9315499c5bf5ead89fbb877a0b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_d8dc3269a0929364fae6a6b73b9"`,
    );
    await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "menuId"`);
    await queryRunner.query(`DROP TABLE "menu"`);
  }
}
