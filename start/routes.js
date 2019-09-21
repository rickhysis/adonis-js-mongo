'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('users.index')

Route.group(() => {
  Route.get('/', 'Api/UsersController.index')
  Route.post('/', 'Api/UsersController.store').validator('StoreUser')
  Route.get('/:id', 'Api/UsersController.show')
  Route.put('/:id', 'Api/UsersController.update').validator('UpdateUser')
  Route.delete('/:id', 'Api/UsersController.delete')
}).prefix('api/v1/users')
