const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword
} = require('@feathersjs/authentication-local').hooks;

const populateUser = require('../../hooks/populate-user');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt') ],
    get: [authenticate('jwt') ],
    create: [hashPassword('password')],
    update: [authenticate('jwt') ],
    patch: [authenticate('jwt') ],
    remove: [authenticate('jwt') ]
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
