/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const validation = require('./hooks/validation');
const process = require('./hooks/process');
const processQuery = require('./hooks/process-query');
const populateUser = require('../../hooks/populate-user');
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
      comment.user = await context.app.service('users').get(comment.userId, {
        ...params,
        query: {}
      });
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

const answerResolvers = {
  joins: {
    user: (...args) => async (answer, context) => {
      const { params } = context;
      answer.user = await context.app.service('users').get(answer.userId,
        {
          ...params,
          query: {}
        });
    },
    likers: {
      resolver: (...args) => async (answer, context) => {
        const { params } = context;
        answer.likers = (await context.app.service('users').find({
          ...params,
          query: {
            _id: {
              $in: answer.likes
            },
            // $select: ['_id', 'userName']
          }
        })).data;
      }
    },
    comments: {
      resolver: (...args) => async(answer, context) => {
        answer.comments = (await context.app.service('comments').find({
          query: {
            _id: {
              $in: answer.listComments
            },
            $sort: {
              createAt: -1
            }
          }
        })).data;
        return answer.comments;
      },
      joins: commentResolvers
    }
  }
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ mongoKeys(ObjectID, foreignKeys)],
    get: [],
    create: [ validation(), process()],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: [commonHooks.disallow('external')]
  },

  after: {
    all: [commonHooks.iff(commonHooks.isProvider('external'), fastJoin(answerResolvers))],
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
