/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const process = require('./hooks/process');
const updatListReview = require('./hooks/update-listreview');

const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'cvId', 'userId'
];
// fast join
const { fastJoin, makeCallingParams } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;


const reviewResolvers = {
  joins: {
    author: (...args) => async (review, context) => {
      const {params} = context;
      const { user } = params;
      if (user.role === 'specialist') {
        review.author = (await context.app.service('specialists').find({
          ...params,
          query: {
            userId: review.userId
          }
        })).data[0];
      }
      if (user.role === 'volunteer') {
        review.author = (await context.app.service('volunteers').find({
          ...params,
          query: {
            userId: review.userId
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
    find: [mongoKeys(ObjectID, foreignKeys)],
    get: [],
    create: [process()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [fastJoin(reviewResolvers, query)],
    get: [fastJoin(reviewResolvers, query)],
    create: [updatListReview()],
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
