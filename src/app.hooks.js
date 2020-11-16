/* eslint-disable no-unused-vars */
// Application hooks that run for every service
const errorsResponse = require('./hooks/errors-response');
const log = require('./hooks/log');
const logError = require('./hooks/log-error');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
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
    all: [logError()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
