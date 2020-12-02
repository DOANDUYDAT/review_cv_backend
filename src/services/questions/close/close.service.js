// Initializes the `close` service on path `/questions/:questionId/close`
const { Close } = require('./close.class');
const hooks = require('./close.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/questions/:questionId/close', new Close(options, app));

  // A hook that updates `data` with the route parameter
  function mapQuestionIdToData(context) {
    if(context.data && context.params.route.questionId) {
      context.data.questionId = context.params.route.questionId;
    }
  }

  // For the new route, map the `:questionId` route parameter to the query in a hook
  app.service('questions/:questionId/close').hooks({
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
  const service = app.service('questions/:questionId/close');

  service.hooks(hooks);
};
