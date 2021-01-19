const { authenticate } = require('@feathersjs/authentication').hooks;
const validation = require('./hooks/validation');
const process = require('./hooks/process');
const addToSpecialist = require('./hooks/add-to-specilaist');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
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
