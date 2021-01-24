// Initializes the `close` service on path `/questions/:questionId/close`
const { PrimaryNews } = require('./primary.class');
const hooks = require('./primary.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/recruitments/primary', new PrimaryNews(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('recruitments/primary');

  service.hooks(hooks);
};
