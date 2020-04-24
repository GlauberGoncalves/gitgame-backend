'use strict'

const Job  = use('App/Models/Institution/Job')
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with jobs
 */
class JobController {
  /**
   * Show a list of all jobs.
   * GET jobs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({auth}) {
    console.log('entrou aqui')    
    return await Job
      .query()
      .innerJoin('institutions', 'institutions.id', 'jobs.institution_id')
      .where({'institutions.user_id': auth.user.id})
      .fetch()
  }

  /**
   * Create/save a new job.
   * POST jobs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['title','requirements', 'content', 'institution_id'])
    const job = await Job.create({...data})
    return job
  }

  /**
   * Display a single job.
   * GET jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {    
    const job = await Job.findOrFail(params.id)
    return job;
  }

  /**
   * Update job details.
   * PUT or PATCH jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['name','description', 'image'])
    
    const job = await Job.findOrFail(params.id)

    if(institution.user_id !== auth.user.id){
      return response.status(401)
    }

    job.merge(data)
    await job.save()
  }

  /**
   * Delete a job with id.
   * DELETE jobs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const job = await Job.findOrFail(params.id)

    if(job.user_id !== auth.user.id){
      return response.status(401)
    }

    await job.delete()
  }

  async application({request, params, auth}){

    const data = request.only(['job_id'])
    const user = await User.find(auth.user.id)
    const job = await Job.find(data.job_id)
    
    await user.jobs().attach(job.id)
    await user.load('jobs')
    return user    
  }
}

module.exports = JobController
