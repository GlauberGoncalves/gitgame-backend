'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserChallengeSchema extends Schema {
  up() {
    this.create('user_challenge', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
      table
        .integer('challenge_id')
        .unsigned()
        .notNullable()
        .references('challenges.id')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_challenge')
  }
}

module.exports = UserChallengeSchema
