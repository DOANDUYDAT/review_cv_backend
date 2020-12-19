// Initializes the `close` service on path `/questions/:questionId/close`
const { TurnOnNotify } = require('./turn-on.class');
const hooks = require('./turn-on.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/turn-on', new TurnOnNotify(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/turn-on');

  service.hooks(hooks);
};
