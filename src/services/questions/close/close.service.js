// Initializes the `close` service on path `/questions/:questionId/close`
const { Close } = require('./close.class');
const hooks = require('./close.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/questions/close', new Close(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('questions/close');

  service.hooks(hooks);
};
