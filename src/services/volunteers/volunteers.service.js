// Initializes the `volunteers` service on path `/volunteers`
const { Volunteers } = require('./volunteers.class');
const hooks = require('./volunteers.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/volunteers', new Volunteers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('volunteers');

  service.hooks(hooks);
};
