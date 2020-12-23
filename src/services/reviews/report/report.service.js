// Initializes the `reports` service on path `/reports`
const { Report } = require('./report.class');
const hooks = require('./report.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reviews/report', new Report(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reviews/report');

  service.hooks(hooks);
};
