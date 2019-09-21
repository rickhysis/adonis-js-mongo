'use strict'

const User = use('App/Models/User')

class UsersController {
  async index({
    request,
    response
  }) {
    const page = request.input('page') || 1
    const limit = request.input('limit') || 10
    const user = await User.query().paginate(page, Number(limit))
    
    return response.json(user)
  }

  async store({
    request,
    response
  }) {
    //await this.validate(request.all(), User.rules())
    const user = new User(request.only(['firstname', 'lastname', 'email', 'address', 'contact']))

    await user.save()

    return response.status(201).json(user)
  }

  async show({
    params,
    response
  }) {
    const user = await User.find(params.id)

    return response.status(200).json(user)
  }

  async update({
    params,
    request,
    response
  }) {
    const userNew = request.only(['firstname', 'lastname', 'address', 'contact'])
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({
        code: 404,
        message: 'Data not found'
      })
    }

    user.merge(userNew)
    await user.save()

    return response.status(201).json(user)
  }

  async delete({
    params,
    response
  }) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({
        code: 404,
        message: 'Data not found'
      })
    }

    await user.delete()

    return response.status(204).json({
      code: 200,
      message: 'Delete Successfully'
    })
  }
}

module.exports = UsersController
