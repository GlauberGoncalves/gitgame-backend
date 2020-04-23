'use strict'

const Answer = use('App/Models/Forum/Answer')
const Question = use('App/Models/Forum/Question')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with answers
 */
class AnswerController {
  /**
   * Show a list of all answers.
   * GET answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const answers = await Answer.query()        
    .fetch()

    return answers
  }

  /**
   * Create/save a new answer.
   * POST answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {    
    const data = request.only(['question_id','content'])
    
    const question = await Question.find(data.question_id)
    
    if(!question){      
      return response.json({error: "pergunta não encontrada"})
    }    

    const answer = await Answer.create({user_id: auth.user.id, ...data})
    return answer
  }


  /**
   * Display a single answer.
   * GET answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update answer details.
   * PUT or PATCH answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a answer with id.
   * DELETE answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {    
    const answer = await Answer.findOrFail(params.id)

    if(answer.user_id !== auth.user.id){
      return response.status(401)
    }

    await answer.delete()
  }

  async selectBestAnswer({request, auth, response}){

    const data = request.only(['id', 'best_answer'])    
    const answer = await Answer.findOrFail(data.id)
    const question = await Question.find(answer.question_id)
        
    if(question.user_id !== auth.user.id){
      return response.status(401)
    }

    answer.merge(data)
    answer.save()
    
    return response.json({status: 200})
  }

}

module.exports = AnswerController
