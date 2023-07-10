import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUUIDExtension1600775219837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
