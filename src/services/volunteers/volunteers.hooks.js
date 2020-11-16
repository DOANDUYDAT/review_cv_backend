const { authenticate } = require('@feathersjs/authentication').hooks;
const validateVolunteer = require('../../hooks/validation/volunteer');
const {
  hashPassword
} = require('@feathersjs/authentication-local').hooks;

const populateUser = require('../../hooks/populate-user');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ validateVolunteer(), hashPassword('password') ],
    update: [ authenticate('jwt'), validateVolunteer() ],
    patch: [ authenticate('jwt'), validateVolunteer() ],
    remove: [ authenticate('jwt'), validateVolunteer() ]
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
