// Initializes the `close` service on path `/questions/:questionId/close`
const { DeActive } = require('./deactive.class');
const hooks = require('./deactive.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/deactive', new DeActive(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/deactive');

  service.hooks(hooks);
};
