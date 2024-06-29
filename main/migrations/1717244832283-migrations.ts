import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717244832283 implements MigrationInterface {
  name = 'Migrations1717244832283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e72767bdde78d61c776e794b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "UQ_2e72767bdde78d61c776e794b7e" UNIQUE ("authorId", "restaurantId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "UQ_2e72767bdde78d61c776e794b7e"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e72767bdde78d61c776e794b7" ON "review" ("authorId", "restaurantId") `,
    );
  }
}
