/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const validation = require('./hooks/validation');
const process = require('./hooks/process');
const dauria = require('dauria');
const processUpdate = require('./hooks/process-update');
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [validation(), process()],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: []
  },

  after: {
    all: [],
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
