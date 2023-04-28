import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class StartDate1682686601260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Start_Date',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'start_date_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'fk_Start_Date_Users',
            columnNames: ['start_date_id'],
            referencedTableName: 'Users',
            referencedColumnNames: ['id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Start_Date');
  }
}
