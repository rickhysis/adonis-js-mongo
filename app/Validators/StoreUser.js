'use strict'

class StoreUser {
  get rules () {
    return {
      firstname: 'required',
      lastname: 'required',
      email: 'required|email|unique:users,email',
      address: 'required',
      contact: 'required',
    }
  }

  get messages () {
    return {
      'firstname.required': 'You must provide a password',
      'lastname.required': 'You must provide a password',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'address.required': 'You must provide a password',
      'contact.required': 'You must provide a password'
    }
  }
}

module.exports = StoreUser
