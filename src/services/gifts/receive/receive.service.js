// Initializes the `close` service on path `/questions/:questionId/close`
const { Receive } = require('./receive.class');
const hooks = require('./receive.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gifts/receive', new Receive(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gifts/receive');

  service.hooks(hooks);
};
