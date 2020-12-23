// Initializes the `rates` service on path `/rates`
const { Rate } = require('./rate.class');
const hooks = require('./rate.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reviews/rate', new Rate(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reviews/rate');

  service.hooks(hooks);
};
