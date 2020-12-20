// Initializes the `close` service on path `/questions/:questionId/close`
const { Interest } = require('./review-cv.class');
const hooks = require('./review-cv.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cvs/review-cv', new Interest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cvs/review-cv');

  service.hooks(hooks);
};
