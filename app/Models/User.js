'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  questions(){
    return this.hasMany('App/Models/Forum/Question')
  }

  institutions(){
    return this.hasMany('App/Models/Institution/Institution')
  }

  jobs(){
    return this.belongsToMany('App/Models/Institution/Job')
      .pivotTable('job_applications')
      .withTimestamps()
  }
  
  challenges(){
    return this.belongsToMany('App/Models/Challenge')    
      .pivotTable('user_challenge')
  }

  repositories(){
    return this.hasMany('App/Models/Repositories')
  }

}

module.exports = User
