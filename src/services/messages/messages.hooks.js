/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');

const validateMessage = require('../../hooks/validation/message');
const populateUser = require('../../hooks/populate-user');

const foreignKeys = [
  '_id', 'userId'
];

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [mongoKeys(ObjectID, foreignKeys)],
    get: [],
    create: [validateMessage()],
    update: [validateMessage()],
    patch: [validateMessage()],
    remove: []
  },

  after: {
    all: [populateUser('userId')],
    find: [],
    get: [],
    create: [],
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
