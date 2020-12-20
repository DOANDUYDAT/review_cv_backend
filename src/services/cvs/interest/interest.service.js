// Initializes the `close` service on path `/questions/:questionId/close`
const { Interest } = require('./interest.class');
const hooks = require('./interest.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cvs/interest', new Interest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cvs/interest');

  service.hooks(hooks);
};
