/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const sendMail = require('./hooks/send-mail');
const updateNotify = require('./hooks/update-notify-user');

const commonHooks = require('feathers-hooks-common');
const { mongoKeys } = require('feathers-hooks-common');
const { ObjectID } = require('mongodb');
const foreignKeys = [
  '_id', 'to', 'from'
];
// fast join
const { fastJoin, makeCallingParams } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;


const notifyResolvers = {
  joins: {
    fromUser: (...args) => async (notify, context) => {
      // console.log(notify.from);
      if (notify.from) {
        const {params} = context;
        const mem = await context.app.service('users').get(notify.from);

        notify.fromUser = mem;
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
    find: [mongoKeys(ObjectID, foreignKeys)],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [fastJoin(notifyResolvers, query)],
    get: [fastJoin(notifyResolvers, query)],
    create: [fastJoin(notifyResolvers, query), updateNotify(), sendMail()],
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
