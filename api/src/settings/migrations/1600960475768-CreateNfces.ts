import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateNfces1600960475768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'nfces',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'consumerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'issuerId',
            type: 'uuid',
          },
          {
            name: 'sourceUrl',
            type: 'varchar',
          },
          {
            name: 'accessKey',
            type: 'varchar',
          },
          {
            name: 'additionalInformation',
            type: 'varchar',
          },
          {
            name: 'operationDestinationId',
            type: 'uuid',
          },
          {
            name: 'finalCostumerId',
            type: 'uuid',
          },
          {
            name: 'buyerPresenceId',
            type: 'uuid',
          },
          {
            name: 'model',
            type: 'integer',
          },
          {
            name: 'series',
            type: 'integer',
          },
          {
            name: 'number',
            type: 'integer',
          },
          {
            name: 'emissionDate',
            type: 'timestamp',
          },
          {
            name: 'amount',
            type: 'decimal',
          },
          {
            name: 'icmsBasis',
            type: 'decimal',
          },
          {
            name: 'icmsValue',
            type: 'decimal',
          },
          {
            name: 'protocol',
            type: 'bigint',
          },
          {
            name: 'paymentMethodId',
            type: 'uuid',
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
            name: 'NfceUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'NfceConsumer',
            referencedTableName: 'consumers',
            referencedColumnNames: ['id'],
            columnNames: ['consumerId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'NfceIssuer',
            referencedTableName: 'issuers',
            referencedColumnNames: ['id'],
            columnNames: ['issuerId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'NfceOperationDestination',
            referencedTableName: 'operationDestinations',
            referencedColumnNames: ['id'],
            columnNames: ['operationDestinationId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'NfceFinalCostumer',
            referencedTableName: 'finalCostumers',
            referencedColumnNames: ['id'],
            columnNames: ['finalCostumerId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'NfceBuyerPresence',
            referencedTableName: 'buyerPresences',
            referencedColumnNames: ['id'],
            columnNames: ['buyerPresenceId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'NfcePaymentMethod',
            referencedTableName: 'paymentMethods',
            referencedColumnNames: ['id'],
            columnNames: ['paymentMethodId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('nfces');
  }
}
