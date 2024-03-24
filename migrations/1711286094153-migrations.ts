import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711286094153 implements MigrationInterface {
  name = 'Migrations1711286094153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blacklist_refresh_token" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_15649830888a4c24d72467d07ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "blacklist_refresh_token" ADD CONSTRAINT "FK_d327abc29f70bb6786f47d730eb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blacklist_refresh_token" DROP CONSTRAINT "FK_d327abc29f70bb6786f47d730eb"`,
    );
    await queryRunner.query(`DROP TABLE "blacklist_refresh_token"`);
  }
}
