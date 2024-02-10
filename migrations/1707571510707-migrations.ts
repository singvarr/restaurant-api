import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1707571510707 implements MigrationInterface {
  name = 'Migrations1707571510707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "restaurant_id_seq" OWNED BY "restaurant"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "id" SET DEFAULT nextval('"restaurant_id_seq"')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "restaurant_id_seq"`);
  }
}
