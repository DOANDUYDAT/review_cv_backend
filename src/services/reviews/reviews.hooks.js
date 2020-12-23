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
    rating: (...args) => async (review, context) => {
      review.rating = await context.app.service('rates').get(review.ratingId);
    },
    report: (...args) => async (review, context) => {
      review.report = await context.app.service('reports').get(review.reportId);
    }
  }
};

const query = {
  author: true,
  rating: true,
  report: true
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
