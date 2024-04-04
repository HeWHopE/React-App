'use strict';

const { MigrationInterface, QueryRunner, Table } = require('typeorm');

module.exports = class CreateTasksTable1618229800000 {
  async up(queryRunner) {
    await queryRunner.createTable(new Table({
      name: 'tasks',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'due_date',
          type: 'date',
          isNullable: true,
        },
        {
          name: 'priority',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'list_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'list_name',
          type: 'varchar',
          isNullable: false,
        },
      ],
      foreignKeys: [
        {
          columnNames: ['list_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'task_lists',
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('tasks');
  }
};
