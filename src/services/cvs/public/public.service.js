// Initializes the `close` service on path `/questions/:questionId/close`
const { Public } = require('./public.class');
const hooks = require('./public.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cvs/public', new Public(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cvs/public');

  service.hooks(hooks);
};
