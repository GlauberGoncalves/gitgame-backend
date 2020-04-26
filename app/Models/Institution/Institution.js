'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Institution extends Model {

    user() {
        return this.belongsTo('App/Models/User')
    }

    jobs(){
        return this.hasMany('App/Models/Institution/Job')
    }

    challenges(){
        return this.hasMany('App/Models/Challenge')
    }
}

module.exports = Institution
