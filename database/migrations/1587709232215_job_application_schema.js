'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class JobApplicationSchema extends Schema {
  up () {
    this.create('job_applications', (table) => {
      table.increments()

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .index('user_id')
      table
        .integer('job_id')
        .unsigned()
        .notNullable()
        .references('jobs.id')        
        .onDelete('CASCADE')
        .index('job_id')

      table.timestamps()
    })
  }

  down () {
    this.drop('job_applications')
  }
}

module.exports = JobApplicationSchema
