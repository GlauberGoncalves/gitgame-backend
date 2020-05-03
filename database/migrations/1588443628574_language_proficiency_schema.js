'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LanguageProficiencySchema extends Schema {
  up () {
    this.create('language_proficiencies', (table) => {
      table.increments()
      table
      .integer('repositories_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('repositories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('language').notNullable()
      table.integer('score').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('language_proficiencies')
  }
}

module.exports = LanguageProficiencySchema
