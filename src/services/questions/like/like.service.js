// Initializes the `close` service on path `/questions/:questionId/close`
const { Like } = require('./like.class');
const hooks = require('./like.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/questions/:questionId/like', new Like(options, app));

  // A hook that updates `data` with the route parameter
  function mapQuestionIdToData(context) {
    if(context.data && context.params.route.questionId) {
      context.data.questionId = context.params.route.questionId;
    }
  }

  // For the new route, map the `:questionId` route parameter to the query in a hook
  app.service('questions/:questionId/like').hooks({
    before: {
      find(context) {
        context.params.query.questionId = context.params.route.questionId;
      },
      create: mapQuestionIdToData,
      update: mapQuestionIdToData,
      patch: mapQuestionIdToData
    }
  });

  // Get our initialized service so that we can register hooks
  const service = app.service('questions/:questionId/like');

  service.hooks(hooks);
};
