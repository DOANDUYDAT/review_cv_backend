/* eslint-disable no-unused-vars */
const { authenticate } = require('@feathersjs/authentication').hooks;
const validationQuestion = require('./hooks/validation');
const processQuestion = require('./hooks/process');
const populateUser = require('../../hooks/populate-user');
const commonHooks = require('feathers-hooks-common');

// fast join
const { fastJoin, makeCallingParams } = require('feathers-hooks-common');
const BatchLoader = require('@feathers-plus/batch-loader');
const { getResultsByKey, getUniqueKeys } = BatchLoader;

// const answerResolvesrs = {
//   joins: {
//     user: () => async (answer, context) =>
//       !answer.userId
//         ? null
//         : (answer.user = await context._loaders.user._id.load(
//           answer.userId
//         ))
//   }
// };

// const questionResolvers = {
//   before: context => {
//     context._loaders = { user: {}, answers: {} };

//     context._loaders.user._id = new BatchLoader(
//       async (keys, context) => {
//         const result = await context.app.service('users').find(
//           makeCallingParams(
//             context,
//             { _id: { $in: getUniqueKeys(keys) } },
//             undefined,
//             { paginate: false }
//           )
//         );
//         return getResultsByKey(keys, result, user => user._id, '!');
//       },
//       { context }
//     );

//     context._loaders.answers.questionId = new BatchLoader(
//       async (keys, context) => {
//         const result = await context.app.service('answers').find(
//           makeCallingParams(
//             context,
//             { _id: { $in: getUniqueKeys(keys) } },
//             undefined,
//             { paginate: false }
//           )
//         );
//         return getResultsByKey(keys, result, answer => answer.questionId, '[!]');
//       },
//       { context }
//     );
//   },

//   joins: {
//     user: () => async (question, context) =>
//       (question.user = await context._loaders.user.id.load(question.userId)),
//     answers: {
//       resolver: (...args) => async (question, context) =>
//         (question.answers = await context._loaders.answers.questionId.load(
//           question._id
//         )),
//       joins: answerResolvesrs
//     }
//   }
// };

const commentResolvers = {
  joins: {
    user: (...args) => async (comment, context) => {
      const {params} = context;
      comment.user = await context.app.service('users').get(comment.userId, params);
    },
    likers: {
      resolver: (...args) => async (comment, context) => {
        const { params } = context;
        comment.likers = (await context.app.service('users').find({
          ...params,
          query: {
            _id: {
              $in: comment.likes
            },
            // $select: ['_id', 'userName']
          }
        })).data;
      }
    },
  }
};

const answerResolvers = {
  joins: {
    user: (...args) => async (answer, context) => {
      const { params } = context;
      answer.user = (
        await context.app.service('users').find({
          ...params,
          query: { _id: answer.userId },
          // paginate: false
        })
      ).data[0];
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

const questionResolvers = {
  joins: {
    user: (...args) => async (question, context) => {
      const {params} = context;
      question.user = await context.app.service('users').get(question.userId, params);
    },
    likers: {
      resolver: (...args) => async (question, context) => {
        const { params } = context;
        question.likers = (await context.app.service('users').find({
          ...params,
          query: {
            _id: {
              $in: question.likes
            },
            // $select: ['_id', 'userName']
          }
        })).data;
      }
    },
    answers: {
      resolver: (...args) => async(question, context) => {
        question.answers = (await context.app.service('answers').find({
          query: {
            _id: {
              $in: question.listAnswers
            },
            $sort: {
              createAt: -1
            }
          }
        })).data;
        return question.answers;
      },
      joins: answerResolvers
    }
  }
};

const query = {
  user: true,
  // starers: [['id', 'name']],
  answers: {
    user: true,
    comments: {
      user: true
    }
  },
  likers: true
};


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ validationQuestion(), processQuestion() ],
    update: [commonHooks.disallow('external')],
    patch: [commonHooks.disallow('external')],
    remove: [commonHooks.disallow('external')]
  },

  after: {
    all: [fastJoin(questionResolvers, query)],
    find: [ ],
    get: [ ],
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
