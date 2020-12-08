// Initializes the `close` service on path `/questions/:questionId/close`
const { Accept } = require('./accept.class');
const hooks = require('./accept.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/specialists/accept', new Accept(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('specialists/accept');

  service.hooks(hooks);
};
