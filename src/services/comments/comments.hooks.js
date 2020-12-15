/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const validation = require('./hooks/validation');
const process = require('./hooks/process');
const processQuery = require('./hooks/process-query');
// const populateUser = require('../../hooks/populate-user');
const commonHooks = require('feathers-hooks-common');
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'userId', 'questionId'
];

// fast join
const { fastJoin, makeCallingParams } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;

const commentResolvers = {
  joins: {
    user: (...args) => async (comment, context) => {
      const {params} = context;
      comment.user = await context.app.service('users').get(comment.userId, params);
    },
    // likers: {
    //   resolver: (...args) => async (comment, context) => {
    //     const { params } = context;
    //     comment.likers = (await context.app.service('users').find({
    //       ...params,
    //       query: {
    //         _id: {
    //           $in: comment.likes
    //         },
    //         // $select: ['_id', 'userName']
    //       }
    //     })).data;
    //   }
    // },
  }
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [mongoKeys(ObjectID, foreignKeys), processQuery()],
    get: [],
    create: [validation(), process()],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: [commonHooks.disallow('external')]
  },

  after: {
    all: [commonHooks.iff(commonHooks.isProvider('external'), fastJoin(commentResolvers))],
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
