/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const process = require('./hooks/process');
const updateListcvMember = require('./hooks/update-listcv-member');


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [process()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [updateListcvMember()],
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
