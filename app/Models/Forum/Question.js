'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Question extends Model {

    user() {
        return this.belongsTo('App/Models/User')
    }

    answer(){
        return this.hasMany('App/Models/Forum/Answer')
    }

}

module.exports = Question
