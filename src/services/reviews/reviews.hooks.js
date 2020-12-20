/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'userId'
];
// fast join
const { fastJoin, makeCallingParams } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;


const reviewResolvers = {
  joins: {
    author: (...args) => async (cv, context) => {
      const {params} = context;
      const { user } = params;
      if (user.role === 'specialist') {
        cv.author = (await context.app.service('specialists').find({
          ...params,
          query: {
            userId: cv.userId
          }
        })).data[0];
      }
      if (user.role === 'volunteer') {
        cv.author = (await context.app.service('volunteers').find({
          ...params,
          query: {
            userId: cv.userId
          }
        })).data[0];
      }
    }
  }
};

const query = {
  author: true,
  viewers: true
};
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [fastJoin(reviewResolvers, query)],
    get: [fastJoin(reviewResolvers, query)],
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
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
