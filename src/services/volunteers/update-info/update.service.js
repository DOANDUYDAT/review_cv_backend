// Initializes the `close` service on path `/questions/:questionId/close`
const { Update } = require('./update.class');
const hooks = require('./update.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/volunteers/update-info', new Update(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('volunteers/update-info');

  service.hooks(hooks);
};
