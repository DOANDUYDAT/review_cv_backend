// Initializes the `close` service on path `/questions/:questionId/close`
const { Active } = require('./active.class');
const hooks = require('./active.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/active', new Active(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/active');

  service.hooks(hooks);
};
