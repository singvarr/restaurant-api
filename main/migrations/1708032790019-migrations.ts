import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1708032790019 implements MigrationInterface {
  name = 'Migrations1708032790019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "restaurant" ADD "ownerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "restaurant" ADD CONSTRAINT "FK_315af20ce2dd3e52d28fba79fab" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant" DROP CONSTRAINT "FK_315af20ce2dd3e52d28fba79fab"`,
    );
    await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "ownerId"`);
  }
}
