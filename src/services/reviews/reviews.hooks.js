/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const process = require('./hooks/process');
const updatListReview = require('./hooks/update-listreview');
const updateRoom = require('./hooks/update-room');
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

const cvResolvers = {
  joins: {
    author: (...args) => async (cv, context) => {
      const {params} = context;
      cv.author = (await context.app.service('members').find({
        ...params,
        query: {
          userId: cv.userId
        }
      })).data[0];
    }
  }
};

const reviewResolvers = {
  joins: {
    author: (...args) => async (review, context) => {
      const {params} = context;
      // logged user
      const { user } = params;
      const ownerReview = await context.app.service('users').get(review.userId);
      if (ownerReview.role === 'specialist') {
        review.author = (await context.app.service('specialists').find({
          ...params,
          query: {
            userId: review.userId
          }
        })).data[0];
      }
      if (ownerReview.role === 'volunteer') {
        review.author = (await context.app.service('volunteers').find({
          ...params,
          query: {
            userId: review.userId
          }
        })).data[0];
      }
    },
    cv: {
      resolver: (...args) => async (review, context) => {
        review.cv = await context.app.service('cvs').get(review.cvId);
        return review.cv;
      },
      joins: cvResolvers
    }
  }
};

const query = {
  author: true,
  cv: {
    author: true
  }
};
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [mongoKeys(ObjectID, foreignKeys)],
    get: [],
    create: [process()],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: []
  },

  after: {
    all: [],
    find: [fastJoin(reviewResolvers, query)],
    get: [fastJoin(reviewResolvers, query)],
    create: [updatListReview(), updateRoom()],
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
