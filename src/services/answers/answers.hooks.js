/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const validation = require('./hooks/validation');
const process = require('./hooks/process');
const processQuery = require('./hooks/process-query');
const populateUser = require('../../hooks/populate-user');
const commonHooks = require('feathers-hooks-common');
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'userId', 'questionId'
];
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ mongoKeys(ObjectID, foreignKeys), processQuery()],
    get: [],
    create: [ validation(), process()],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: [commonHooks.disallow('external')]
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
