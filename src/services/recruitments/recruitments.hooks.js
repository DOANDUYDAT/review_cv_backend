/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const validation = require('./hooks/validation');
const process = require('./hooks/process');
const addToSpecialist = require('./hooks/add-to-specilaist');
const commonHooks = require('feathers-hooks-common');
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'to', 'from'
];
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [mongoKeys(ObjectID, foreignKeys)],
    get: [],
    create: [validation(), process()],
    update: [validation(), process()],
    patch: [validation(), process()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addToSpecialist()],
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
