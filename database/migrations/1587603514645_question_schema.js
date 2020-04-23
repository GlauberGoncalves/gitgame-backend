'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        
      table.string('content', 1000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
