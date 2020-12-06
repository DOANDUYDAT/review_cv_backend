/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const accountService = require('../authmanagement/notifier');
const validateUser = require('../../hooks/validation/user');
const verifyHooks = require('feathers-authentication-management').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id'
];
module.exports = {
  before: {
    all: [],
    find: [],
    get: [mongoKeys(ObjectID, foreignKeys)],
    create: [ commonHooks.disallow('external'), validateUser(), verifyHooks.addVerification() ],
    update: [ commonHooks.disallow('external')],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(true,
          ['email',
            'isVerified',
            'verifyToken',
            'verifyShortToken',
            'verifyExpires',
            'verifyChanges',
            'resetToken',
            'resetShortToken',
            'resetExpires']
        ),
        hashPassword('password'),
        authenticate('jwt')
      )
    ],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [
      verifyHooks.removeVerification()
    ],
    create: [
      context => {
        accountService(context.app).notifier('resendVerifySignup', context.result);
      },
      verifyHooks.removeVerification()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
