// Initializes the `questions` service on path `/questions`
const { Questions } = require('./questions.class');
const hooks = require('./questions.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/questions', new Questions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('questions');

  service.hooks(hooks);
};
