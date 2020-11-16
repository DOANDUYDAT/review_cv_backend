// Initializes the `admins` service on path `/admins`
const { Admins } = require('./admins.class');
const hooks = require('./admins.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/admins', new Admins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('admins');

  service.hooks(hooks);
};
