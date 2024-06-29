import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1715510782744 implements MigrationInterface {
  name = 'Migrations1715510782744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "review" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "rating" integer NOT NULL, "feedback" character varying(200) NOT NULL, "authorId" integer, "restaurantId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e72767bdde78d61c776e794b7" ON "review" ("authorId", "restaurantId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_1e758e3895b930ccf269f30c415" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_209aeb49a7aebc856b84b940a41" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_209aeb49a7aebc856b84b940a41"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_1e758e3895b930ccf269f30c415"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e72767bdde78d61c776e794b7"`,
    );
    await queryRunner.query(`DROP TABLE "review"`);
  }
}
