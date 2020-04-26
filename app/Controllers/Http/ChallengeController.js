'use strict'

const Challenge = use('App/Models/Challenge')
const Institution = use('App/Models/Institution/Institution')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with challenges
 */
class ChallengeController {
  /**
   * Show a list of all challenges.
   * GET challenges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const challenge = await Challenge.query()
      .with('institution')
      .fetch()

    return challenge
  }

  /**
   * Create/save a new challenge.
   * POST challenges
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth}) {

    const data = request.only(['title', 'content', 'image'])
    const user = auth.user
    const institution = await Institution.findByOrFail('user_id', user.id)

    return await Challenge.create({'institution_id': institution.id ,...data})
    
  }

  /**
   * Display a single challenge.
   * GET challenges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const challenge = await Challenge.findOrFail(params.id);

    return challenge;
  }

  /**
   * Update challenge details.
   * PUT or PATCH challenges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {

    const {id} = params
    const data = request.only(['title', 'content', 'image'])
    const challengeInstitution = await Challenge.query({'id': id, 'institution.user_id': auth.user.id})
      .limit(1)
      .with('institution')
      .fetch()

    const userId = challengeInstitution.toJSON()[0].institution.user_id

    if (userId != auth.user.id){
      return response.status(401)
    }

    const challenge = await Challenge.findOrFail(id)
    await challenge.merge(data)
    return challenge.save()
  }

  /**
   * Delete a challenge with id.
   * DELETE challenges/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ auth, response }) {
    const maxResults = 1

    const challenge = await Challenge.query({'institution.user_id': auth.user.id})
      .with('institution')
      .limit(maxResults)
      .fetch()
      
      const challengeJSON = challenge.toJSON()[0]      
      if(challengeJSON.institution.user_id != auth.user.id){
        return response.status(401)
      }

      const challengeToDelete = await Challenge.find( challengeJSON.id )
      
      await challengeToDelete.delete()
  }
}

module.exports = ChallengeController
