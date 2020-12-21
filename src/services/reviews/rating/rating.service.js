// Initializes the `close` service on path `/questions/:questionId/close`
const { Rating } = require('./rating.class');
const hooks = require('./rating.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reviews/rating', new Rating(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reviews/rating');

  service.hooks(hooks);
};
