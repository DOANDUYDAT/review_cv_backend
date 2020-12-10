const { authenticate } = require('@feathersjs/authentication').hooks;
const validationQuestion = require('./hooks/validation');
const processQuestion = require('./hooks/process');
const populateUser = require('../../hooks/users/populate');
const commonHooks = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ validationQuestion(), processQuestion() ],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: []
  },

  after: {
    all: [populateUser('userId')],
    find: [ ],
    get: [ ],
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
