'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    
    this.create('users', (collection) => {
      collection.increments()
      collection.string('firstname')
      collection.string('lastname')
      collection.string('address')
      collection.string('email')
      collection.string('contact')
      collection.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
