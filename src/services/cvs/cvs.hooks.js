/* eslint-disable no-unused-vars */
const search = require('feathers-mongodb-fuzzy-search');
const { authenticate } = require('@feathersjs/authentication').hooks;
const process = require('./hooks/process');
const updateListcvMember = require('./hooks/update-listcv-member');
const createNewNotification = require('./hooks/create-newCv-notify');

const commonHooks = require('feathers-hooks-common');
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'userId'
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
    },
    viewers: {
      resolver: (...args) => async (cv, context) => {
        const { params } = context;
        cv.viewers = (await context.app.service('users').find({
          ...params,
          query: {
            _id: {
              $in: cv.listViewer
            },
            $select: ['_id', 'userName']
          }
        })).data;
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
    find: [search(), mongoKeys(ObjectID, foreignKeys)],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [commonHooks.iff(commonHooks.isProvider('external'), fastJoin(cvResolvers))],
    get: [commonHooks.iff(commonHooks.isProvider('external'), fastJoin(cvResolvers))],
    create: [updateListcvMember(), createNewNotification()],
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
