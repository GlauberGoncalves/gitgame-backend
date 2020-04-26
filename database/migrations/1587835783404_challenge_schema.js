'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChallengeSchema extends Schema {
  up () {
    this.create('challenges', (table) => {
      table.increments()
      table
        .integer('institution_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('institutions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('image').notNullable()
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.table('challenges', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ChallengeSchema
