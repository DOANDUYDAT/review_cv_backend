// Initializes the `close` service on path `/questions/:questionId/close`
const { TurnOff } = require('./turn-off.class');
const hooks = require('./turn-off.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users/turn-off', new TurnOff(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users/turn-off');

  service.hooks(hooks);
};
