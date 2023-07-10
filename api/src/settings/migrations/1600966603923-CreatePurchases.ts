import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePurchases1600966603923
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchases',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nfceId',
            type: 'uuid',
          },
          {
            name: 'code',
            type: 'bigint',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'decimal',
          },
          {
            name: 'unit',
            type: 'varchar',
          },
          {
            name: 'totalPrice',
            type: 'decimal',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'PurchaseNfce',
            referencedTableName: 'nfces',
            referencedColumnNames: ['id'],
            columnNames: ['nfceId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases');
  }
}
