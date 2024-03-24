import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1710797360569 implements MigrationInterface {
  name = 'Migrations1710797360569';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blacklist_access_token" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_5f7ae2161317a7d14e5f58750f2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "blacklist_access_token" ADD CONSTRAINT "FK_edeea85a8ecd5ad3fab732e3fe2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blacklist_access_token" DROP CONSTRAINT "FK_edeea85a8ecd5ad3fab732e3fe2"`,
    );
    await queryRunner.query(`DROP TABLE "blacklist_access_token"`);
  }
}
