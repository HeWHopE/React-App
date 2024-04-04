'use strict';

const { MigrationInterface, QueryRunner , Table} = require('typeorm');

module.exports = class CreateTask_listsTable1618229900000 {
  async up(queryRunner) {
    await queryRunner.createTable(new Table({
      name: 'task_lists',
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
        }
      ],
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('task_lists');
  }
};
