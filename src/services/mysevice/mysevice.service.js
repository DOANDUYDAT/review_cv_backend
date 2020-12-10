// Initializes the `mysevice` service on path `/mysevice`
const { Mysevice } = require('./mysevice.class');
const hooks = require('./mysevice.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mysevice', new Mysevice(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mysevice');

  service.hooks(hooks);
};
