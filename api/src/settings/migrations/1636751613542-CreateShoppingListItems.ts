import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShoppingListItems1636751613542
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shoppingListItems',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'shoppingListId',
            type: 'uuid',
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'real',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_ShoppingListItem',
            referencedTableName: 'shoppingLists',
            referencedColumnNames: ['id'],
            columnNames: ['shoppingListId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shoppingListItems');
  }
}
