'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Job extends Model {

    institution(){
        return this.belongsTo('App/Models/Institution/Institution')
    }    

}

module.exports = Job
