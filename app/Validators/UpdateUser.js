'use strict'

class UpdateUser {
  get rules () {
    //const userId = this.ctx.params.id

    return {
      firstname: 'required',
      lastname: 'required',
      //email: `required|email|unique:users,email,_id,${userId}`,
      address: 'required',
      contact: 'required',
    }
  }

  get messages () {
    return {
      'firstname.required': 'You must provide a password',
      'lastname.required': 'You must provide a password',
      'address.required': 'You must provide a password',
      'contact.required': 'You must provide a password'
    }
  }
}

module.exports = UpdateUser
