// Initializes the `specialists` service on path `/specialists`
const { Specialists } = require('./specialists.class');
const hooks = require('./specialists.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/specialists', new Specialists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('specialists');

  service.hooks(hooks);
};
