const { authenticate } = require('@feathersjs/authentication').hooks;
const validateSpecialist = require('../../hooks/validation/specialist');
const {
  hashPassword
} = require('@feathersjs/authentication-local').hooks;

const populateUser = require('../../hooks/populate-user');
const processQuery = require('../../hooks/specialists/process-query');
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'userId'
];
module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), processQuery(), mongoKeys(ObjectID, foreignKeys) ],
    get: [ authenticate('jwt') ],
    create: [ validateSpecialist(), hashPassword('password') ],
    update: [ authenticate('jwt'), validateSpecialist() ],
    patch: [ authenticate('jwt'), validateSpecialist() ],
    remove: [ authenticate('jwt'), validateSpecialist() ]
  },

  after: {
    all: [ populateUser('userId') ],
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
