/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'cvId', 'userId'
];
// fast join
const { fastJoin, makeCallingParams } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;


const notifyResolvers = {
  joins: {
    fromUser: (...args) => async (notify, context) => {
      if (notify.from) {
        const {params} = context;
        // logged user
        const { user } = params;
        const spec = (await context.app.service('specialists').find({
          query: {
            userId: notify.from
          }
        })).data[0];
        notify.fromUser = spec;
      } else {
        notify.fromUser = null;
      }
    }
  }
};

const query = {
  fromUser: true
};
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
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
    create: [fastJoin(notifyResolvers, query)],
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
