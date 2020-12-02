const { authenticate } = require('@feathersjs/authentication').hooks;
const validationQuestion = require('../../hooks/questions/validation');
const processQuestion = require('../../hooks/questions/process');
const populateUser = require('../../hooks/users/populate');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ validationQuestion(), processQuestion() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ populateUser('userId') ],
    get: [ populateUser('userId') ],
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
