'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionSchema extends Schema {
  up () {
    this.create('institutions', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 256).notNullable()
      table.string('image')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('institutions')
  }
}

module.exports = InstitutionSchema
