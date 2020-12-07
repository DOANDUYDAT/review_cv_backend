const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword
} = require('@feathersjs/authentication-local').hooks;
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const populateUser = require('../../hooks/populate-user');
const foreignKeys = [
  '_id', 'userId'
];

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt'), mongoKeys(ObjectID, foreignKeys) ],
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
