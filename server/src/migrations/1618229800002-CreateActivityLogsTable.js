'use strict'

const { MigrationInterface, QueryRunner, Table } = require('typeorm')

module.exports = class CreateActivityLogTable1618229800000 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'activity_log',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'actionType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'actionDescription',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'fromColumn',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'toColumn',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'task_id',
            type: 'int',
            isNullable: true,
          },
        ],
      }),
    )
  }

  async down(queryRunner) {
    await queryRunner.dropTable('activity_log')
  }
}
