'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => {
  Route.resource('question', "QuestionController").apiOnly().except(['update'])

  Route.resource('answer','AnswerController').apiOnly().except(['update'])
  Route.post('/answer/selectBestAnswer', 'AnswerController.selectBestAnswer')

  Route.resource('institution','InstitutionController')
  Route.resource('job','JobController').apiOnly()
  Route.post('/job/:id/application', 'JobController.application')
  
}).middleware('auth')