'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositoriesSchema extends Schema {
  up () {
    this.create('repositories', (table) => {
      table.increments()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('name')
      table.string('homepage')
      table.string('full_name')
      table.boolean('private')
      table.string('description')
      table.boolean('fork')
      table.string('url')
      table.string('clone_url')
      table.string('language')
      table.string('has_issues')
      table.string('has_pages')
      table.string('forks_count')
      table.integer('open_issues_count')
      table.integer('stargazers_count')
      table.string('default_branch')

      table.timestamps()
    })
  }

  down () {
    this.drop('repositories')
  }
}

module.exports = RepositoriesSchema
