// Initializes the `recruitments` service on path `/recruitments`
const { Recruitments } = require('./recruitments.class');
const hooks = require('./recruitments.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recruitments', new Recruitments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recruitments');

  service.hooks(hooks);
};
